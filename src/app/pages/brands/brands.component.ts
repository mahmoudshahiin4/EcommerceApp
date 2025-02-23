import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private  readonly brandsService = inject(BrandsService); 
  brands:IBrands[] = []

  getbrandsData():void {
    this.brandsService.getAllBrands().subscribe({
      next: (res)=>{
 
        this.brands = res.data ; 
        
      },
      error: (err)=>{
         console.log(err);
         
      }, 
      complete: ()=>{
  
      }
     }) ;
   };
   
   ngOnInit(): void {
     this.getbrandsData(); 


    
   }
}

