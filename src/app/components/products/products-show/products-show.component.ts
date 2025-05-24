import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import Swiper from "swiper";

interface Product {
  id: number;
  name: string;
  amount: number;
  stock: number;
  category?: string;
  description?: string;
  image?: string[];
}

@Component({
  selector: "app-products-show",
  templateUrl: "./products-show.component.html",
  styleUrls: ["./products-show.component.css"],
})
export class ProductsShowComponent implements OnInit, AfterViewInit {
  message: string = "";
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      if (res.status) {
        this.products = res.products;
      } else {
        this.message = res.message;
      }
    });
  }

  ngAfterViewInit(): void {
    // Delay ensures view is updated before Swiper is initialized
    setTimeout(() => {
      document.querySelectorAll('.swiper-container').forEach((el) => {
        new Swiper(el as HTMLElement, {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: (el as HTMLElement).querySelector('.swiper-button-next') as HTMLElement,
            prevEl: (el as HTMLElement).querySelector('.swiper-button-prev') as HTMLElement,
          },
        });
      });
    }, 100); // Small delay to ensure DOM is ready
  }

  onEdit() {}
  deleteUser() {}
}
