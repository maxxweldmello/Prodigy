import { Injectable } from "@angular/core";
import { Product } from "./product-interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ProductService {
    private productUrl = 'api/products/products.json'

    constructor(private http: HttpClient){}

    getProduct(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl).pipe(
            // tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }   

    private handleError(err: HttpErrorResponse){
        let errorMessage = ''
        if(err.error instanceof ErrorEvent){
            errorMessage = `An Error Occured ${err.error.message}`
        }else{
            errorMessage = `Server retured code: ${err.status}, error message is ${err.message}`
        }
        console.error(errorMessage)
        return throwError(() => errorMessage)
    }
}
