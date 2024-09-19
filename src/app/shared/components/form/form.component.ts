import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public produto = input<Product | null>(null);
  public form!: FormGroup;

  @Output() done = new EventEmitter<Product>();

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl<string>(this.produto()?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
    });
  }

  onSubmit() {
    const product = this.form.value as Product;

    this.done.emit(product);
  }
}
