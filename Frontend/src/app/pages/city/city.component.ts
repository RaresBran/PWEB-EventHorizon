import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDto } from '../../models/event-dto';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {EventService} from "../../services/services/event.service";
import {UserStoreService} from "../../services/store/user-store.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
  ],
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  city: string = '';
  events: Array<EventDto> = [];
  page: number = 0;
  size: number = 10;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  searchQuery: string = '';

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
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadEvents();
  }

  viewEvent(eventId: string): void {
    this.router.navigate(['/event', eventId]).then();
  }

  addToMyList(eventId: string): void {
    this.eventService.addEventToUserList(eventId).subscribe(() => {
      alert('Event added to your list');
    });
  }

  deleteEvent(eventId: string): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }

  editEvent(eventId: string): void {
    // Navigate to an edit event component or handle editing inline
  }

  addEvent(): void {
    // Navigate to an add event component or handle adding inline
  }

  searchEvents(): void {
    // Implement search functionality based on searchQuery
  }

  getTotalPages(): number {
    // Assuming you have a totalItems variable somewhere or data.totalPages
    const totalItems = this.events?.length || 0;
    return Math.ceil(totalItems / this.size);
  }
}
