import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog/delete-dialog.component';
import { filter } from 'rxjs';
import { DialogDeleteService } from '../../shared/services/dialog-delete.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private _productsService = inject(ProductsService);
  private _router = inject(Router);
  private _dialogDeleteService = inject(DialogDeleteService);

  public products$$ = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);

  public onEdit(product: Product) {
    this._router.navigate(['/edit-product', product.id]);
  }

  public onDelete(product: Product) {
    this._dialogDeleteService.openDialog()
    .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this._productsService.delete(product.id).subscribe(() => {
          this._productsService.getAll().subscribe((products) => {
            this.products$$.set(products);
          })
        })
      })
  }
}
