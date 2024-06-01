import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventCategoryDto } from '../../models/event-category-dto';
import { EventService } from "../../services/services/event.service";
import { CommonModule } from "@angular/common";
import { EventCategoryService } from "../../services/services/event-category.service";
import {EventSaveDto} from "../../models/event-save-dto";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  categories: EventCategoryDto[] = [];
  availableCities: string[] = ['BUCHAREST', 'CLUJ_NAPOCA', 'BRASOV'];
  currentCity: string = '';
  eventId: string | null = null;
  isEditMode: boolean = false;
  existingImages: string[] = []; // Store base64 strings for existing images

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private eventCategoryService: EventCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      id: [null], // Add ID field to the form group
      name: ['', Validators.required],
      information: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      link: [''],
      categories: [[], Validators.required],
      images: [[]],
      locations: this.fb.array([this.createLocationGroup()], Validators.required) // Ensure at least one location is required
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCity = params.get('city') ?? '';
      this.eventId = params.get('id');
      this.isEditMode = !!this.eventId;

      if (this.isEditMode && this.eventId) {
        this.loadEvent(this.eventId);
      }
    });

    this.eventCategoryService.getAllEventCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  createLocationGroup(): FormGroup {
    return this.fb.group({
      city: ['', Validators.required],
      streetAddress: ['', Validators.required]
    });
  }

  get locations(): FormArray {
    return this.eventForm.get('locations') as FormArray;
  }

  addLocation(): void {
    this.locations.push(this.createLocationGroup());
  }

  removeLocation(index: number): void {
    this.locations.removeAt(index);
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.eventForm.patchValue({ images: files });
    }
  }

  loadEvent(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(event => {
      this.eventForm.patchValue({
        id: event.id, // Set the event ID
        name: event.name,
        information: event.information,
        startDate: this.formatDate(event.startDate), // Convert to yyyy-MM-dd format
        endDate: this.formatDate(event.endDate), // Convert to yyyy-MM-dd format
        link: event.link,
        categories: event.categories?.map(category => category.id),
        locations: event.locations
      });

      this.eventForm.setControl('locations', this.fb.array(
        event.locations.map(location => this.fb.group({
          city: [location.city, Validators.required],
          streetAddress: [location.streetAddress, Validators.required]
        }))
      ));

      this.existingImages = event.images?.map(image => 'data:image/png;base64,' + image.imageData) || [];
    });
  }

  formatDate(date: string | undefined): string | null {
    return date ? new Date(date).toISOString().split('T')[0] : null;
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const event: EventSaveDto = {
        id: formValue.id, // Include the ID in the DTO
        name: formValue.name,
        information: formValue.information,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        link: formValue.link,
        locations: formValue.locations.map((location: { city: string, streetAddress: string }) => ({
          city: location.city as 'BUCHAREST' | 'CLUJ_NAPOCA' | 'BRASOV',
          streetAddress: location.streetAddress
        })),
        categories: formValue.categories.map((id: string) => ({ id }))
      };

      const formData = new FormData();
      formData.append('eventDto', JSON.stringify(event));
      Array.from(formValue.images as FileList).forEach((file: File) => {
        formData.append('files', file);
      });

      if (this.isEditMode) {
        this.eventService.saveEvent(event).subscribe(() => {
          this.router.navigate(['/city', this.currentCity]).then();
        });
      } else {
        this.eventService.saveEventWithImages(formData).subscribe(() => {
          this.router.navigate(['/city', this.currentCity]).then();
        });
      }
    }
  }
}
