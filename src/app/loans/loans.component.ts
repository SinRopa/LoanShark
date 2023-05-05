import { Component } from '@angular/core';

import { Guid } from "guid-typescript";
import { GamedataService, ILoan } from '../gamedata.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
  
 
  constructor(private gameData: GamedataService) {}
  
  Loans: ILoan[] = this.gameData.Loans; 

  CreateLoan()
  {
    this.gameData.CreateLoan();
    //this.Loans = this.gameData.Loans;
    
  }
  ClearLoans()
  {
    this.gameData.ClearLoans();
    //this.Loans = this.gameData.Loans;
    
  } 
  AcceptLoan(id:Guid)
  {
    this.gameData.CreatePayments(id);
  }

  SortByCost() 
  {

    this.gameData.SortLoansByCost();
  }

  SortByPayments() 
  {

    this.gameData.SortLoansByPayments();
  }

  SortByValue() 
  {

    this.gameData.SortLoansByValue();
  }
}
