import { Injectable } from "@angular/core";

export interface Product {
  id: number;
  name: string;
  amount: number;
  stock: number;
  category?: string;
  description?: string;
  mediaGallery?: any[];
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: "Product A", amount: 250, stock: 15 },
    { id: 2, name: "Product B", amount: 120, stock: 7 },
    { id: 3, name: "Product C", amount: 340, stock: 20 },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): boolean {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      return true;
    }
    return false;
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}
