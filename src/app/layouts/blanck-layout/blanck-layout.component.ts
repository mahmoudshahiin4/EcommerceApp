import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blanck-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blanck-layout.component.html',
  styleUrl: './blanck-layout.component.scss'
})
export class BlanckLayoutComponent {

}
