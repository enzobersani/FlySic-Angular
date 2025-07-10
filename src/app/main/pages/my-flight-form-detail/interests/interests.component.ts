import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserInterestModel } from '../../../common/models/user-interest-model';
import { NgFor, NgIf } from '@angular/common';
import { ButtonGroupComponent } from "../../../../shared/components/navigation/button-group/button-group.component";
import { ButtonPrimaryComponent } from "../../../../shared/components/forms/buttons/button-primary/button-primary.component";

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

  ngOnInit(): void {
    // this.interestsEvent.emit(this.interests);
  }
}
