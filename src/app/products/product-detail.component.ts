import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './product-interface';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle: string = "Product Description"
  products!: Product[];
  sub!: Subscription
  errorMesssage: string = "";

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private productService: ProductService
  ){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle +=  `: ${this.id}`;
    
      this.sub = this.productService.getProduct().subscribe({
        next: products => {
          this.products = products.filter(product => product.productId === this.id);
        },
        error: err => this.errorMesssage = err
      })
  }

  starRatingVisible: boolean = false;

  showStarRatingOverlay(productId: number, starRating: number) {
    this.router.navigate(['/products', productId, { rating: starRating }]);
    this.starRatingVisible = !this.starRatingVisible;
  }

  hideStarRatingOverlay(productId: number) {
    this.router.navigate(['/products', productId]);
    this.starRatingVisible = !this.starRatingVisible;
  }

  onBack(){
    this.router.navigate(['/products'])
  }
}