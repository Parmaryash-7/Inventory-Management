import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { ProductService, Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  mediaArray: { image: string; id: number }[] = [];
  tempArray: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private alertService: AlertService
  ) {

    // this.router.
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });


  }

  get f() {
    return this.productForm.controls;
  }

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
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeMedia(index: number): void {
    this.mediaArray.splice(index, 1);
    this.tempArray.splice(index, 1);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill out this form.';
      return;
    }

    const newProduct: Product = {
      // id: Date.now(),
      ...this.productForm.value,
      image: [...this.tempArray]
    };

    // console.log(newProduct);

    this.productService.addProduct(newProduct).subscribe((res)=>{
      if(res.status){
        this.alertService.success("Product Created!")
        this.productForm.reset();
        this.mediaArray = [];
        this.tempArray = [];
        this.errorMessage = '';
        this.router.navigate(['/products']);
      }else {
        console.log(res);
        this.alertService.error("Something Went Wrong!", "Creation Failed!")
      }
    });
  }
}
