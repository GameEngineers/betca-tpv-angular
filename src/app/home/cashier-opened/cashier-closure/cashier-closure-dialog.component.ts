import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import {CashierClosureService} from './cashier-closure.service';
import {CashierState} from './cashier-state.model';
import {CashierClosure} from './cashier-closure.model';
import {CashMovementsDialogComponent} from './cash-movements/cash-movements-dialog.component';

@Component({
  templateUrl: 'cashier-closure-dialog.component.html',
  styleUrls: ['cashier-closure-dialog.component.css']
})
export class CashierClosureDialogComponent {
  cashierClosureFinal: CashierClosure = {finalCash: null, finalCard: null, comment: undefined};
  cashierState: CashierState =
    {salesTotal: null, totalCard: null, totalCash: null, totalVoucher: null};

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashierClosureDialogComponent>,
              private cashierClosureService: CashierClosureService) {
    this.cashierClosureService.readState().subscribe(
      cashierClosureData => this.cashierState = cashierClosureData
    );
  }

  close() {
    this.cashierClosureService.close(this.cashierClosureFinal).subscribe(
      () => this.dialogRef.close()
    );
  }

  invalid() {
    return (!this.cashierClosureFinal.finalCash && this.cashierClosureFinal.finalCash !== 0)
      || (!this.cashierClosureFinal.finalCard && this.cashierClosureFinal.finalCard !== 0)
      || !this.cashierClosureFinal.comment;
  }

  cashMovement() {
    this.dialog.open(CashMovementsDialogComponent);
  }

}
