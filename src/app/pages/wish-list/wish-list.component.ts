import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWish } from '../../shared/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService); 
  private readonly cartService = inject(CartService); 
  private  readonly toastrService = inject(ToastrService);

  wishDetails:IWish[] = [] ; 

  getWishData():void 
  {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res)=>{
         this.wishDetails = res.data ; 
      }, 
      error: (err)=>{
         console.log(err);
         
      }, 
    });
  };

  ngOnInit(): void {
    this.getWishData();
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

  removeWishItem(id:string):void 
  {
    this.wishlistService.removeProduct(id).subscribe({
      next: (res)=>{
         
         this.wishDetails = res.data ; 
      },
      error: (err)=>{
         console.log(err);
         
      },
    });
  }; 

}
