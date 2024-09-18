import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private _productsService = inject(ProductsService);
  private _matSnackBar = inject(MatSnackBar);
  private _router = inject(Router);

  public form = new FormGroup({
    title: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
  })

  public onSubmit() {
    this._productsService.post({ title: this.form.controls.title.value }).subscribe(() => {
      this._matSnackBar.open('Produto criado com sucesso!', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this._router.navigateByUrl('/');
    });
  }
}
