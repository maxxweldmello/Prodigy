import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product-interface';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  ratingNumber: string = '';
  products: Product[] = [];
  errorMessage: string = ''
  sub!: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // listFilter: string = '';
  private _listFilter: any = ""
  // Filters
  private _idFilter: string = '';
  private _productNameFilter: string = '';
  private _releaseDateFilter: string = '';
  private _priceFilterMin: number = 0;
  private _priceFilterMax: number = 500;
  private _ratingFilterRange: string = '';

  filteredProducts: Product[] = []

  get listFilter(): any {
    return this._listFilter
  }
  set listFilter(value: any) {
    this._listFilter = value;
    // console.log("Value -> ", value)
    this.filteredProducts = this.performFilterMain(value);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this._listFilter },  
      queryParamsHandling: 'merge' 
    });
  }

  get idFilter(): string {
    return this._idFilter;
  }
  set idFilter(value: string) {
    this._idFilter = value;
    this.applyFiltersIndividually();
  }

  get productNameFilter(): string {
    return this._productNameFilter;
  }
  set productNameFilter(value: string) {
    this._productNameFilter = value;
    this.applyFiltersIndividually();
  }

  get releaseDateFilter(): string {
    return this._releaseDateFilter;
  }
  set releaseDateFilter(value: string) {
    this._releaseDateFilter = value;
    this.applyFiltersIndividually();
  }

  get priceFilterMin(): number {
    return this._priceFilterMin;
  }

  set priceFilterMin(value: number) {
    this._priceFilterMin = value;
    this.filteredProducts = this.performFilterByPrice();
  }

  get priceFilterMax(): number {
    return this._priceFilterMax;
  }

  set priceFilterMax(value: number) {
    this._priceFilterMax = value;
    this.filteredProducts = this.performFilterByPrice();
  }

  get ratingFilterRange(): string {
    return this._ratingFilterRange;
  }
  set ratingFilterRange(value: string) {
    this._ratingFilterRange = value;
    this.filteredProducts = this.performFilterByRating(value);
  }

  performFilterMain(filterBy: any): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productId.toString().includes(filterBy) ||
      product.productName.toLocaleLowerCase().includes(filterBy) ||
      product.productCode.toLocaleLowerCase().includes(filterBy) ||
      product.releaseDate.toLocaleLowerCase().includes(filterBy) ||
      product.description.toLocaleLowerCase().includes(filterBy) ||
      product.price.toString().includes(filterBy)
    )
  }

  // Apply all filters
  applyFiltersIndividually(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (this._idFilter === '' || product.productId.toString().includes(this._idFilter)) &&
        (this._productNameFilter === '' || product.productName.toLocaleLowerCase().includes(this._productNameFilter.toLocaleLowerCase())) &&
        (this._releaseDateFilter === '' || product.releaseDate.toLocaleLowerCase().includes(this._releaseDateFilter.toLocaleLowerCase()))
      );
    });
  }

  performFilterByPrice(): Product[] {
    return this.products.filter(
      (product: Product) => product.price >= this._priceFilterMin && product.price <= this._priceFilterMax
    );
  }
  
  performFilterByRating(filterRange: string): Product[] {
    if (!filterRange) return this.products;

    const [min, max] = filterRange.split('-').map(parseFloat);
    return this.products.filter(
      (product: Product) =>
        product.starRating >= min && product.starRating <= max
    );
  }

  ngOnInit(): void {
    // this.products = this.productService.getProduct();

    // this.listFilter = ""
    // this.filteredProducts = this.products;

    // // this.sub = this.productService.getProduct().subscribe({
    // //   next: products => {
    // //     this.products = products;
    // //     this.filteredProducts = this.products;
    // //   },
    // //   error: err => this.errorMessage = err
    // // })

    // // // this.route.queryParams.subscribe(params => {
    // // //   const search = params['search'] || '';
  
    // // //   this.listFilter = search;
  
    // // //     this.sub = this.productService.getProduct().subscribe({
    // // //       next: products => {
    // // //         this.products = products;
    // // //         this.filteredProducts = this.performFilterMain(search);
    // // //       },
    // // //       error: err => this.errorMessage = err
    // // //     });  
    // // // });

      this.route.data.subscribe((data) => {
        this.products = data['products'];
        this.filteredProducts = this.products;
      });
    }
      

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  // showImage: boolean = true;

  // toggleImage(): void{
  //   this.showImage = !this.showImage
  // }


  productIds: number[] = [];

  toggleImageById(productId: number): void {
    const index = this.productIds.indexOf(productId);
    if (index === -1) {
      this.productIds.push(productId);
    } else {
      this.productIds.splice(index, 1);
    }
  }

  showImageById(productId: number): boolean {
    return this.productIds.includes(productId);
  }

  onRatingClicked(message: string): void {
    this.ratingNumber = message;
  }

  onQuantityChange(productId: number, newQuantity: number): void {
    const product = this.products.find(p => p.productId === productId);
    if (product) {
      product.quantity = newQuantity;
    }
  }

}
