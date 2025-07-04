import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { FlightFormsModel } from '../../common/models/flight-forms-model';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent implements OnInit{
  // userId: string;
  flightList: FlightFormsModel[] = []; 

  constructor(
    private authService: AuthService
  ) {
    // this.userId = this.authService.getDecodedToken()!.sub;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
