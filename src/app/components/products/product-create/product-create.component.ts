import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    id: null!,
    name: "",
    amount: null!,
    stock: null!,
    category: "",
    description: "",
    count: null!,
  };

  submitted = false;
  selectedFile: File | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      console.log("Selected file:", this.selectedFile);
      // You can add preview or upload logic here if needed
    }
  }

  onSubmit() {
    if (
      !this.product.id ||
      !this.product.name ||
      !this.product.amount ||
      !this.product.stock
    ) {
      return;
    }

    this.productService.addProduct({ ...this.product });
    this.submitted = true;

    // Reset form
    this.product = {
      id: null!,
      name: "",
      amount: null!,
      stock: null!,
      category: "",
      description: "",
      count: null!,
    };

    // Navigate to products list page after create
    this.router.navigate(["/products"]);
  }
}
