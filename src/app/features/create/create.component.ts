import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent, BackToListComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private _productsService = inject(ProductsService);
  private _matSnackBar = inject(MatSnackBar);
  private _router = inject(Router);

  protected product: Product = inject(ActivatedRoute).snapshot.data['product'];

  public onSubmit(product: Product) {
    this._productsService.post(product).subscribe(() => {
      this._matSnackBar.open('Produto criado com sucesso!', 'X');
      this._router.navigateByUrl('/');
    });
  }
}
