import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../features/delete-dialog/delete-dialog/delete-dialog.component';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product.interface';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogDeleteService {
  private _matDialog = inject(MatDialog);

  constructor() { }

  public openDialog(): Observable<boolean> {
    return this._matDialog.open(DeleteDialogComponent).afterClosed();
  }
}
