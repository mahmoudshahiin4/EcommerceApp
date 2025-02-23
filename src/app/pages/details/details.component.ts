import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
   private readonly activatedRoute = inject(ActivatedRoute); 
   private readonly productsService = inject(ProductsService); 
   private readonly cartService = inject(CartService); 
   private  readonly toastrService = inject(ToastrService); 
   private  readonly wishlistService = inject(WishlistService);  

   productId:any ;  
   productData:IProducts | null = null  ; 
   wishlist: Set<string> = new Set(); 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
       this.productId = res.get('id'); 

       this.productsService.getSpecificProducts(this.productId).subscribe({
        next: (res)=>{
        this.productData = res.data ; 
        },
        error: (err)=>{  
        },
       }); 
        
      }, 
      error: (err)=>{
      }, 
    })
  }

  addToCart(id:string):void
   {
    this.cartService.addProductToCart(id).subscribe({
      next: (res)=>{
        
        if (res.status === 'success') {
          this.toastrService.success(res.message , 'FreshCart'); 
        }; 
        this.cartService.cartNumber.set(res.numOfCartItems) ; 
        console.log(this.cartService.cartNumber());
        
      
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

   toggleWishList(id: string): void {
    if (this.wishlist.has(id)) {
      this.wishlist.delete(id); 
    } else {
      this.wishlist.add(id);
    }}

}
