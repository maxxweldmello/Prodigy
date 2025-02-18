import { Component } from '@angular/core';
import { Product } from './product-interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  pageTitle: string = "Product Edit"
  products: Product[] = [];
  sub!: Subscription
  errorMesssage: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private productService: ProductService
  ){}

  id = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(){
    this.pageTitle +=  `: ${this.id}`;
    
    this.sub = this.productService.getProduct().subscribe({
      next: products => {
        this.products = products.filter(product => product.productId === this.id);
      },
      error: err => this.errorMesssage = err
    })
    
  }

  onBack(){
    this.router.navigate(['/products', this.id])
  }

  onBackToProducts(){
    this.router.navigate(['/products'])
  }

}
