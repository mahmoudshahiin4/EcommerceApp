import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  
  
  constructor(private httpClient:HttpClient) { }
  
  // cartNumber:WritableSignal<number> = signal(0); 


  addProductToWishList(id:string):Observable<any>
  {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist' , 
      {
        "productId": id
      }, 
      
    )
  }; 

  getLoggedUserWishList():Observable<any>
  {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' 
     
    ); 
  }; 

  removeProduct(id:string):Observable<any>
  {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` 
   
    )
  }; 
}
