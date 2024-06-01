import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDto } from '../../models/event-dto';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from "../../services/services/event.service";
import { ConfirmationModalComponent } from "../../shared/confirmation-modal/confirmation-modal.component";
import { UserStoreService } from "../../services/store/user-store.service";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ConfirmationModalComponent
  ],
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  city: string = '';
  events: Array<EventDto> = [];
  filteredEvents: Array<EventDto> = []; // To hold filtered events
  page: number = 0;
  size: number = 4;
  totalPages: number = 0;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  eventIdToDelete: string | null = null;

  @ViewChild('confirmationModal') confirmationModal!: ConfirmationModalComponent;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.city = this.route.snapshot.paramMap.get('city')?.toUpperCase() ?? '';
      this.loadEvents();
    });

    this.userStore.getCurrentUser().subscribe(user => {
      this.isLoggedIn = this.userStore.isLoggedIn();
      this.isAdmin = this.userStore.isAdmin();
    });
  }

  loadEvents(): void {
    this.eventService.getEventsByCity(this.city, this.page, this.size).subscribe(data => {
      this.events = data.content ?? [];
      this.filteredEvents = this.events; // Initialize filteredEvents with all events
      this.totalPages = data.totalPages ?? 0;
      this.events.forEach(event => {
        event.images?.forEach(image => {
          image.imageData = 'data:image/png;base64,' + image.imageData;
        });
      });
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadEvents();
    }
  }

  viewEvent(eventId: string): void {
    this.router.navigate(['/event', eventId]).then();
  }

  addToMyList(eventId: string): void {
    this.eventService.addEventToUserList(eventId).subscribe(() => {
      alert('Event added to your list');
    });
  }

  openDeleteConfirmationModal(eventId: string): void {
    this.eventIdToDelete = eventId;
    this.confirmationModal.show();
  }

  confirmDeletion(): void {
    if (this.eventIdToDelete) {
      this.eventService.deleteEvent(this.eventIdToDelete).subscribe(() => {
        alert('Event deleted');
        this.loadEvents();
        this.eventIdToDelete = null;
      });
    }
  }

  editEvent(eventId: string): void {
    this.router.navigate(['/edit-event', this.city, eventId]).then();
  }

  addEvent(): void {
    this.router.navigate(['/create-event', this.city]).then();
  }

  searchEvents(): void {
    this.filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.information?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.locations?.some(location => location.streetAddress?.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  getTotalPages(): number {
    return this.totalPages;
  }
}
