import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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

  public products: Product[] = [];

  ngOnInit() {
    this._productsService.getAll().subscribe((products) => {
      this.products = products;
    })
  }

  onEdit() {
    this._router.navigate(['/edit-product']);
  }
}
