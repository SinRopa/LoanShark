import { Component } from '@angular/core';
import { GamedataService } from './gamedata.service';
import { Observable, Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoanShark';
  cash : number = this.gameData.PlayerMoney;

  constructor(private gameData: GamedataService) {
    document.body.className = "bg-dark text-warning";
  }

  subscription: Subscription = new Subscription;
  every500mSeconds: Observable<number> = timer(0, 500);
  SaveSubscription: Subscription = new Subscription;
  every30Seconds: Observable<number> = timer(0, 30000);
   
  ngOnInit() {
    //this.gameData.LoadGame();
    this.subscription = this.every500mSeconds.subscribe(() => {
       this.UpdatePlayerMoney();
       this.gameData.Payouts();
     });
     this.SaveSubscription = this.every30Seconds.subscribe(() => {
      this.gameData.SaveGame();
    });
   }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.SaveSubscription.unsubscribe();
  }

  UpdatePlayerMoney(){this.cash = this.gameData.PlayerMoney;}
}
