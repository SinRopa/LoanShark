import { Component } from '@angular/core';
import { GamedataService, IPayment } from '../gamedata.service';
import * as moment from 'moment';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  
  constructor(private gameData: GamedataService) {}


  Payments: IPayment[] = this.gameData.Payments;

  GetTimeLeft(Payment:IPayment)
  {
    return moment(Payment.time).fromNow();
    
  }


}
