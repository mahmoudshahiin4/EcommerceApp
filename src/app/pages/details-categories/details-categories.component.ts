import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ICategoories } from '../../shared/interfaces/icategoories';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-details-categories',
  imports: [],
  templateUrl: './details-categories.component.html',
  styleUrl: './details-categories.component.scss'
})
export class DetailsCategoriesComponent {

  private readonly cartService = inject(CartService); 
  private readonly CategoriesService = inject(CategoriesService); 
  private readonly activatedRoute = inject(ActivatedRoute);  

    categoryId:any ;  
    categoryData:ICategoories | null = null  ; 

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next: (res)=>{
         this.categoryId = res.get('id'); 
  
         this.CategoriesService.getSpecificCategories(this.categoryId).subscribe({
          next: (res)=>{
          this.categoryData = res.data ;
             
          },
          error: (err)=>{
              console.log(err);
              
          },
         }); 
          
        }, 
        error: (err)=>{
          
        }, 
      })
    }  

}
