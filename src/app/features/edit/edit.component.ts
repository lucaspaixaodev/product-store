import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  private _productsService = inject(ProductsService);
  private _matSnackBar = inject(MatSnackBar);
  private _router = inject(Router);

  protected product: Product = inject(ActivatedRoute).snapshot.data['product'];

  public onSubmit(product: Product) {
    this._productsService.put(this.product.id, product).subscribe(() => {
      this._matSnackBar.open('Produto editado com sucesso!', 'X');
      this._router.navigateByUrl('/');
    });
  }
}
