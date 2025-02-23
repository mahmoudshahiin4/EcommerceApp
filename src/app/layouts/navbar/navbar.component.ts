import { Component, computed, inject, input, Input, Signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { initFlowbite } from 'flowbite';
import { MTranslateService } from '../../core/services/mTranslat/m-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}; 
  private readonly authService = inject(AuthService); 
  private readonly cartService = inject(CartService); 
  private readonly mTranslateService = inject(MTranslateService); 
  private readonly translateService = inject(TranslateService); 

  isUser = input<boolean>(true);
  counterCart:Signal<number> = computed(()=>this.cartService.cartNumber()) ; 

  ngOnInit(): void {
    
    initFlowbite();
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
    
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      });
       
    });

  
  } ; 

  logout():void 
  {
    this.authService.logoutUser();
  };
  
  changeLang(lang:string):void
  {
    this.mTranslateService.changeLangTranslate(lang) ; 
  }; 

  checkLang(lang:string):boolean 
  {
    return this.translateService.currentLang === lang ; 
  }
}
