import { ActivatedRouteSnapshot } from "@angular/router";
import { ProductsService } from "../services/products.service";
import { inject } from "@angular/core";

export const getProduct = (
  route: ActivatedRouteSnapshot
) => {
  const productService = inject(ProductsService);
  return productService.get( route.params['id'] );
}
