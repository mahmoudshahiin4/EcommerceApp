import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit { 

  private readonly activatedRoute = inject(ActivatedRoute); 
  private readonly ordersService = inject(OrdersService); 

  cartId:string = ''; 

  checkOutForm!:FormGroup

  ngOnInit(): void {
    this.initForm();
    this.getCartId(); 
    
  }; 

  getCartId():void 
  {
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
         this.cartId = param.get('id') !; 
          
      }, 
      error:(err)=>{
          console.log(err);
          
      }, 
    });
  };

  initForm():void 
  {
    this.checkOutForm = new FormGroup({
      details: new FormControl(null , [Validators.required]), 
      phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]), 
      city: new FormControl(null , [Validators.required ]) 
    }) ;
  };  

  paymentOnline():void 
  {
    this.ordersService.checkoutPayment(this.cartId , this.checkOutForm.value ).subscribe({
      next: (res)=>{

        if (res.status === 'success' ) {
          open(res.session.url , '_self');
        }
         
      }, 
      error: (err)=>{
         console.log(err);
         
      }, 
    }); 
    
  }
  paymentCash():void 
  {
    this.ordersService.checkoutCash(this.cartId , this.checkOutForm.value ).subscribe({
      next: (res)=>{
         console.log(res);
        if (res.status === 'success' ) {
          open( '/home');
        }
         
      }, 
      error: (err)=>{
         console.log(err);
         
      }, 
    }); 
    
  }

}
 