import { Component, OnInit } from "@angular/core";
import { Product, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  products: Product[] = [];

  countData: any[] = [];
  amountData: any[] = [];

  view: any[] = [700, 400];
  colorScheme = { domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"] };

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "Products";
  yAxisLabelCount = "Count";
  yAxisLabelAmount = "Amount";

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.countData = this.products
      .filter(
        (p) => p.count !== undefined && p.count !== null && !isNaN(p.count)
      )
      .map((p) => ({
        name: p.name,
        value: Number(p.count) || 0,
      }));

    this.amountData = this.products
      .filter(
        (p) => p.amount !== undefined && p.amount !== null && !isNaN(p.amount)
      )
      .map((p) => ({
        name: p.name,
        value: Number(p.amount) || 0,
      }));
  }
}
