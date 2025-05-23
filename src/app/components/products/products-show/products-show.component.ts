import { Component, OnInit } from "@angular/core";

interface Product {
  id: number;
  name: string;
  count: number;
  amount: number;
}
@Component({
  selector: "app-products-show",
  templateUrl: "./products-show.component.html",
  styleUrls: ["./products-show.component.css"],
})
export class ProductsShowComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  products: Product[] = [
    { id: 1, name: "Product A", count: 15, amount: 250 },
    { id: 2, name: "Product B", count: 7, amount: 120 },
    { id: 3, name: "Product C", count: 20, amount: 340 },
  ];
}
