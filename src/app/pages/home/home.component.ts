import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategoories } from '../../shared/interfaces/icategoories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: IProducts[] = [];
  categories:ICategoories[] = [];
  wishlist: Set<string> = new Set(); 
 private readonly productsService = inject(ProductsService);
 private  readonly categoriesService = inject(CategoriesService); 
 private  readonly cartService = inject(CartService);  
 private  readonly wishlistService = inject(WishlistService);  
 private  readonly toastrService = inject(ToastrService); 

 customMainSlider: OwlOptions = {
  loop: true,
  autoplay:true , 
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  mouseDrag: true,
  rtl: true , 
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
 items: 1 , 
  nav: false
}
 customOptions: OwlOptions = {
  loop: true,
  autoplay:true , 
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  mouseDrag: true,
  rtl: true , 
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-angle-right"></i>', '<i class="fa-solid fa-angle-left"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}

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

 getCategoriesData():void
 {
   
   this.categoriesService.getAllCategories().subscribe({
    next: (res)=>{
       
       this.categories = res.data ; 
      
       
    },
    error:()=>{
      
    }, 

   });
 };

 ngOnInit(): void {
  this.getProductsData();
  this.getCategoriesData(); 
 }; 

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

 toggleWishList(id: string): void {
  if (this.wishlist.has(id)) {
    this.wishlist.delete(id); 
  } else {
    this.wishlist.add(id);
  }}

}
