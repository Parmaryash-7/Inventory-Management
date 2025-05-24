import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

interface Product {
  id: number;
  name: string;
  amount: number;
  stock: number;
  category?: string;
  description?: string;
  image?: any[];
}
@Component({
  selector: "app-products-show",
  templateUrl: "./products-show.component.html",
  styleUrls: ["./products-show.component.css"],
})
export class ProductsShowComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products: Product[] = [
    // { id: 1, name: "Product A", count: 15, amount: 250 },
    // { id: 2, name: "Product B", count: 7, amount: 120 },
    // { id: 3, name: "Product C", count: 20, amount: 340 },
  ];

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.products.forEach((product) => {
        console.log(product);
      });
    });
  }
}
