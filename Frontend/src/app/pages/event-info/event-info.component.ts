import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from "../../services/services/event.service";
import { EventDto } from "../../models/event-dto";
import { UserStoreService } from "../../services/store/user-store.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {ConfirmationModalComponent} from "../../shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ConfirmationModalComponent
  ],
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {
  event: EventDto = {} as EventDto;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  @ViewChild('confirmationModal') confirmationModal!: ConfirmationModalComponent;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(data => {
        this.event = data;
        this.event.images?.forEach(image => {
          image.imageData = 'data:image/png;base64,' + image.imageData;
        });
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

  openDeleteConfirmationModal(): void {
    this.confirmationModal.show();
  }

  confirmDeletion(): void {
    if (this.event.id) {
      this.eventService.deleteEvent(this.event.id).subscribe(message => {
        alert('Event deleted');
        this.router.navigate(['/city', this.event.locations[0].city]).then();
      });
    }
  }

  editEvent(): void {
    // Navigate to an edit event component or handle editing inline
  }
}
