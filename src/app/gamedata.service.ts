import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import * as moment from 'moment';
import { Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamedataService {

  constructor() { this.LoadGame()}

  

  public LoadGame()
  {

    const value = localStorage.getItem("save");
    if (typeof value === 'string') {
      const savegame = JSON.parse(value);

      if (typeof savegame.Loans !== "undefined") this.Loans = savegame.Loans;
      if (typeof savegame.Payments !== "undefined") this.Payments = savegame.Payments;
      if (typeof savegame.PlayerMoney !== "undefined") this.PlayerMoney = savegame.PlayerMoney;
      }

      
  }

  SaveGame()
  {
    let saveData =
    {
      Loans: this.Loans,
      Payments: this.Payments,
      PlayerMoney: this.PlayerMoney,
    }
    
    localStorage.setItem("save",JSON.stringify(saveData));
    //$('#Toast_Saved').toast('show');

  }

  Loans: ILoan[] = [];
  Payments: IPayment[] = [];
  PlayerMoney:number = 1000;

  CreatePayments(loanid:Guid)
  {
    //find loan data
    let loanData = this.Loans.find(x=> x.id == loanid);
    if(typeof(loanData) =="undefined"){return;}
    if(loanData.cost > this.PlayerMoney){return;}
    this.PlayerMoney -= loanData.cost;
    
    //make payments
    let payments = loanData.payments;
    let BoughtTime: Date = new Date();
    let payAmount = Math.ceil(loanData.value / payments);
    for (let index = 0; index < payments; index++) {
      
      //create payment object
      let result:IPayment = 
      {
        id: Guid.create(),
        amount: payAmount,
        time: moment(BoughtTime).add(index +1, 'm' ).toDate()
      }
      this.Payments.push(result);
    }
    //remove loan
      const match = this.Loans.indexOf(loanData);
      if (match > -1) {
        this.Loans.splice(match, 1);
     }
  }
 Payouts()
 {

  if(this.Payments.length<1){return;}
  
  this.SortPaymentByTime();

   
  if(this.Payments[0].time.getTime()-Date.now() < 500)
  {
      let payout = this.Payments.shift();
      if(typeof(payout) == 'undefined') {return;}

      this.PlayerMoney += payout.amount;

  }

 }
 ClearLoans(){this.Loans.length =0;}

  CreateLoan()
  {
    let loanCost = this.getRandomInt(100, this.PlayerMoney+100);
    let loanPayments = this.getRandomInt(5,25);

    let interestRate = 1+(loanPayments/100);
    let loanValue = Math.round(loanCost *interestRate); 
    let result:ILoan = 
    {
      id : Guid.create(),
      cost: loanCost,
      value: loanValue,
      payments: loanPayments,

    }

    this.Loans.push(result);

    
  }

  SortLoansByCost(){this.Loans.sort((a,b)=> a.cost - b.cost);}
  SortLoansByPayments(){this.Loans.sort((a,b)=> a.payments - b.payments);}
  SortLoansByValue(){this.Loans.sort((a,b)=> a.value - b.value);}

  SortPaymentByTime(){this.Payments.sort((a,b)=> a.time.getTime() - b.time.getTime()); }

  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}



export interface IPayment {
  id:Guid;
  amount: number;
  time: Date;
}

export interface ILoan {
  id:Guid;
  cost: number;
  value:number;
  payments:number;

}

export interface ISaveData
{
  Loans: ILoan[],
  Payments: IPayment[],
  PlayerMoney: number
}