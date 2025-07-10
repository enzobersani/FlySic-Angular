import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInterestModel } from '../../../common/models/user-interest-model';
import { NgFor, NgIf } from '@angular/common';
import { ButtonGroupComponent } from "../../../../shared/components/navigation/button-group/button-group.component";
import { ButtonPrimaryComponent } from "../../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { FlightService } from '../../../common/services/flight.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    NgFor, NgIf,
    ButtonPrimaryComponent
],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent implements OnInit{
  // @Output() interestsEvent = new EventEmitter<UserInterestModel[]>();
  interests: UserInterestModel[] = [];
  @Input() flightFormId!: string;

  constructor(
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.getInterests();
  }

  getInterests(): void {
    this.flightService.getFlightInterests(this.flightFormId).subscribe({
      next: (data) => this.interests = data,
      error: () => console.error('erro')
    });
  }
}
