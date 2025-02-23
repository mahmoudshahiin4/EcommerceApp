import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategoories } from '../../shared/interfaces/icategoories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private  readonly categoriesService = inject(CategoriesService); 

  categories:ICategoories[] = [];

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
     this.getCategoriesData();
   }

}
