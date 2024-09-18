import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayLoad } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _httpClient = inject(HttpClient);

  getAll() {
    return this._httpClient.get<Product[]>('/api/products');
  }

  post(payload: ProductPayLoad) {
    return this._httpClient.post('/api/products', payload);
  }
}
