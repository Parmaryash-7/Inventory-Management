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
    mediaGallery: [],
  };

  submitted = false;
  mediaArray: any[] = [];
  tempArray: File[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  // Handle image file input
  onMediaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.mediaArray.push({ image: e.target.result });
          this.tempArray.push(file);
          this.product.mediaGallery = [...this.tempArray];
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Remove selected media
  removeMedia(index: number): void {
    this.mediaArray.splice(index, 1);
    this.tempArray.splice(index, 1);
    this.product.mediaGallery = [...this.tempArray];
  }

  // Form submit handler
  onSubmit(): void {
    if (
      !this.product.id ||
      !this.product.name ||
      !this.product.amount ||
      !this.product.stock ||
      !this.product.category ||
      !this.product.description
    ) {
      return; // Skip if any required field is missing
    }

    // Submit the product
    this.productService.addProduct({ ...this.product });

    // Show confirmation
    this.submitted = true;

    // Reset form
    this.product = {
      id: null!,
      name: "",
      amount: null!,
      stock: null!,
      category: "",
      description: "",
      mediaGallery: [],
    };
    this.mediaArray = [];
    this.tempArray = [];

    // Navigate to product list
    this.router.navigate(["/products"]);
  }
}
