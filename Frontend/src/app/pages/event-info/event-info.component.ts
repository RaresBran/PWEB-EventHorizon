import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EventService} from "../../services/services/event.service";
import {EventDto} from "../../models/event-dto";
import {UserStoreService} from "../../services/store/user-store.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {
  event: EventDto = {} as EventDto;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(data => {
        this.event = data;
      });
    }

    this.userStore.getCurrentUser().subscribe(user => {
      this.isLoggedIn = this.userStore.isLoggedIn();
      this.isAdmin = this.userStore.isAdmin();
    });
  }

  addToMyList(): void {
    if (this.event.id) {
      this.eventService.addEventToUserList(this.event.id).subscribe(() => {
        alert('Event added to your list');
      });
    }
  }

  deleteEvent(): void {
    if (this.event.id) {
      this.eventService.deleteEvent(this.event.id).subscribe(() => {
        alert('Event deleted');
      });
    }
  }

  editEvent(): void {
    // Navigate to an edit event component or handle editing inline
  }
}
