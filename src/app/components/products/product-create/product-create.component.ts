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
  mediaArray: { image: string; id: number }[] = [];
  tempArray: File[] = [];
  errorMessage = "";

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  onMediaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageData = {
            image: e.target.result,
            id: Date.now() + Math.random(),
          };
          this.mediaArray.push(imageData);
          this.tempArray.push(file);
          this.product.mediaGallery = [...this.tempArray];
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeMedia(index: number): void {
    this.mediaArray.splice(index, 1);
    this.tempArray.splice(index, 1);
    this.product.mediaGallery = [...this.tempArray];
  }

  onSubmit(): void {
    this.submitted = true;

    const { name, amount, stock, category, description } = this.product;

    const isValid =
      name.trim() &&
      amount != null &&
      stock != null &&
      category.trim() &&
      description.trim() &&
      this.mediaArray.length > 0;

    if (!isValid) {
      this.errorMessage = "Please fill out this form.";
      return;
    }

    this.productService.addProduct({ ...this.product });
    this.errorMessage = "";

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

    this.router.navigate(["/products"]);
  }
}
