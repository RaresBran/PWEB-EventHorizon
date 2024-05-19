import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackDto } from '../../models/feedback-dto';
import {FeedbackService} from "../../services/services/feedback.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      feedbackType: ['', Validators.required],
      satisfaction: ['', Validators.required],
      contactConsent: [false, Validators.requiredTrue],
      comments: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedback: FeedbackDto = this.feedbackForm.value;
      this.feedbackService.submitFeedback(feedback).subscribe({
        next: (response) => {
          alert('Feedback submitted successfully!');
          this.router.navigate(['/']).then();
        },
        error: (error) => {
          console.error('Error submitting feedback', error);
          alert('There was an error submitting your feedback. Please try again.');
        }
      });
    }
  }
}
