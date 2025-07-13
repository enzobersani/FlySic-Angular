import { Component, OnInit } from '@angular/core';
import { ButtonGroupComponent } from "../../../shared/components/navigation/button-group/button-group.component";
import { ButtonGroupInput } from '../../../shared/components/navigation/button-group/model/button-group-input.model';
import { UserInterestModel } from '../../common/models/user-interest-model';
import { ActivatedRoute } from '@angular/router';
import { FlightFormComponent } from "../flight-form/flight-form.component";
import { InterestsComponent } from './components/interests/interests.component';
import { ActionsComponent } from "./components/actions/actions.component";

@Component({
  selector: 'app-my-flight-form-detail',
  standalone: true,
  imports: [ButtonGroupComponent, InterestsComponent, FlightFormComponent, ActionsComponent],
  templateUrl: './my-flight-form-detail.component.html',
  styleUrl: './my-flight-form-detail.component.scss'
})
export class MyFlightFormDetailComponent implements OnInit{
  flightFormId!: string;
  option: 'Interessados' | 'Editar' | 'Ações' = 'Interessados';
  items: ButtonGroupInput[] = [
    { key: 1, text: 'Interessados', activated: true },
    { key: 2, text: 'Editar', activated: false },
    { key: 3, text: 'Ações', activated: false }
  ]

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.flightFormId = this.route.snapshot.paramMap.get('id')!;
  }

  onSetOption(item: ButtonGroupInput): void {
    this.option = item.text as 'Interessados' | 'Editar' | 'Ações';
  }
}
