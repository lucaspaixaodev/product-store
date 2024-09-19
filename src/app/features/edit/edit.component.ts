import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  private _productsService = inject(ProductsService);
  private _matSnackBar = inject(MatSnackBar);
  private _router = inject(Router);
  private _produto: Product = inject(ActivatedRoute).snapshot.data['product'];

  public form = new FormGroup({
    title: new FormControl<string>(this._produto.title, {
      nonNullable: true,
      validators: [Validators.required]
    }),
  })

  public onSubmit() {
    this._productsService.put(this._produto.id, {
      id: '',
      title: this.form.controls.title.value
    }).subscribe(() => {
      this._matSnackBar.open('Produto editado com sucesso!', 'X');
      this._router.navigateByUrl('/');
    });
  }
}
