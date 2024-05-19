import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventCategoryDto } from '../../models/event-category-dto';
import { EventService } from "../../services/services/event.service";
import { CommonModule } from "@angular/common";
import {EventCategoryService} from "../../services/services/event-category.service";
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

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private eventCategoryService: EventCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
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

  saveEvent(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const event: EventSaveDto = {
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

      const redirectUrl = ['/city', this.currentCity];

      if (!formData.get('files')) {
        this.eventService.saveEvent(event).subscribe(() => {
          this.router.navigate(redirectUrl).then();
        });
      } else {
        this.eventService.saveEventWithImages(formData).subscribe(() => {
          this.router.navigate(redirectUrl).then();
        });
      }
    }
  }
}
