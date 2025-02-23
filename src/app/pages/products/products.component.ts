import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: IProducts[] = [];

  wishlist: Set<string> = new Set(); 

   private readonly productsService = inject(ProductsService);
   private readonly wishlistService = inject(WishlistService);
   private readonly cartService = inject(CartService);
   private  readonly toastrService = inject(ToastrService);  

   getProductsData():void
   {
    this.productsService.getAllProducts().subscribe({
      next: (res)=>{
        
          this.products = res.data 
          
      },
      error: (err)=>{
         console.log(err);
         
      }, 
      complete: ()=>{
  
      }
     }) ;
   }; 

   ngOnInit(): void {
     this.getProductsData(); 
   }
   addToCart(id:string):void
   {
    this.cartService.addProductToCart(id).subscribe({
      next: (res)=>{
        
        if (res.status === 'success') {
          this.toastrService.success(res.message , 'FreshCart'); 
        }; 
        this.cartService.cartNumber.set(res.numOfCartItems) ; 
      }, 
      error: (err)=>{   
      }, 
    });
   };

   addToWishList(id:string):void
 {
  this.wishlistService.addProductToWishList(id).subscribe({
    next: (res)=>{
      
      if (res.status === 'success') {
        this.toastrService.success(res.message , 'FreshCart'); 
      }; 
      console.log(res);
      
    
    }, 
    error: (err)=>{
    }, 
  });
 };
  //  -2 
 toggleWishList(id: string): void {
  if (this.wishlist.has(id)) {
    this.wishlist.delete(id); 
  } else {
    this.wishlist.add(id); 
  }}

}
