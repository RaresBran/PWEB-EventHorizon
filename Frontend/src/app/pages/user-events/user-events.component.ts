import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventDto } from '../../models/event-dto';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from "../../services/services/event.service";
import { ConfirmationModalComponent } from "../../shared/confirmation-modal/confirmation-modal.component";
import { UserStoreService } from "../../services/store/user-store.service";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ConfirmationModalComponent
  ],
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {
  events: Array<EventDto> = [];
  filteredEvents: Array<EventDto> = [];
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  eventIdToRemove: string | null = null;

  @ViewChild('confirmationModal') confirmationModal!: ConfirmationModalComponent;

  constructor(
    private eventService: EventService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserEvents();

    this.userStore.getCurrentUser().subscribe(user => {
      this.isLoggedIn = this.userStore.isLoggedIn();
      this.isAdmin = this.userStore.isAdmin();
    });
  }

  loadUserEvents(): void {
    this.eventService.getCurrentUserEventList().subscribe(data => {
      this.events = data;
      this.filteredEvents = this.events;
      this.events.forEach(event => {
        event.images?.forEach(image => {
          image.imageData = 'data:image/png;base64,' + image.imageData;
        });
      });
    });
  }

  viewEvent(eventId: string): void {
    this.router.navigate(['/event', eventId]).then();
  }

  openRemoveConfirmationModal(eventId: string): void {
    this.eventIdToRemove = eventId;
    this.confirmationModal.show();
  }

  confirmRemoval(): void {
    if (this.eventIdToRemove) {
      this.eventService.removeEventFromUserList(this.eventIdToRemove).subscribe(() => {
        alert('Event removed from your list');
        this.loadUserEvents();
        this.eventIdToRemove = null;
      });
    }
  }

  searchEvents(): void {
    this.filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.information?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.locations?.some(location => location.streetAddress?.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
}
