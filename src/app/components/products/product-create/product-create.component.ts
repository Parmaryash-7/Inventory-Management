import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  product = {
    id: "",
    name: "",
    amount: "",
    stock: "",
  };
  constructor() {}

  ngOnInit() {}

  submitted = false;

  onSubmit() {
    console.log("Product Created:", this.product);
    this.submitted = true;
  }
}
