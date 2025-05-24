import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { ProductService, Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // productForm!: FormGroup;
  submitted = false;
  isEditForm: boolean = false;
  errorMessage = '';
  mediaArray: any[] = [];
  tempArray: File[] = [];
  name: string = null;
  formHead: string = 'Create Product';
  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(null),
    stock: new FormControl(null),
    category: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.name);
    
    if (this.name) {
      this.name = this.route.snapshot.params.name;
      this.formHead = 'Edit Product';

      this.productService.getProductByName(this.name).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.productForm = new FormGroup({
            name: new FormControl(res.product.name),
            amount: new FormControl(res.product.amount),
            stock: new FormControl(res.product.stock),
            category: new FormControl(res.product.category),
            description: new FormControl(res.product.description)
          });
          if (res.product.image && res.product.image.length) {
            this.mediaArray = res.product.image;
          }

        } else {
          this.alertService.error("No Product Found!");
          this.router.navigate(['/products']);
        }
      });
    }
  }

  ngOnInit(): void {
    if (!this.name) {
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        amount: new FormControl(null, [Validators.required]),
        stock: new FormControl(null, [Validators.required]),
        category: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });
    }
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
          this.mediaArray.push(e.target.result);
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
      ...this.productForm.value,
      image: [...this.tempArray]
    };

    console.log(newProduct);

    this.productService.addProduct(newProduct).subscribe((res) => {
      if (res.status) {
        this.alertService.success("Product Created!");
        this.productForm.reset();
        this.mediaArray = [];
        this.tempArray = [];
        this.errorMessage = '';
        this.router.navigate(['/products']);
      } else {
        this.alertService.error("Something Went Wrong!", "Creation Failed!");
      }
    });
  }
}
