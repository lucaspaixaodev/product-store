import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayLoad } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _httpClient = inject(HttpClient);

  public getAll() {
    return this._httpClient.get<Product[]>('/api/products');
  }

  public get(id: string) {
    return this._httpClient.get<Product>(`/api/products/${id}`);
  }

  public post(payload: ProductPayLoad) {
    return this._httpClient.post('/api/products', payload);
  }

  public put(id: string, product: Product) {
    return this._httpClient.put(`/api/products/${id}`, product);
  }
}
