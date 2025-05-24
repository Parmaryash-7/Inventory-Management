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
<<<<<<< HEAD
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach((file) => {
=======
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
      mediaGallery: [],
      stock: null!,
      category: "",
      description: "",
      // count: null!,
    };

    // Navigate to products list page after create
    this.router.navigate(["/products"]);
  }

  public mediaArray: any = [];
  public tempArray: any;

  onMediaChange(event: any) {
    const files = event.target.files;
    for (let key in files) {
      const file = files[key];
      if (file instanceof Blob) {
>>>>>>> 47b0f143b74e369e3a984dbd70dca0395c2f1f39
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
<<<<<<< HEAD
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
=======
    this.product.mediaGallery.splice(index, 1);
    // if (removeId) {
    //   this.removedMedia.push(removeId);
    //   this.careerObj.removeMedia = this.removedMedia;
    // }
>>>>>>> 47b0f143b74e369e3a984dbd70dca0395c2f1f39
  }
}
