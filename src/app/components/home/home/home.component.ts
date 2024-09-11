import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SistemasComponent } from '../../sistemas/sistemas/sistemas.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SistemasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentStep: number = 1;

  /**
   *
   */
  constructor(private router: Router) {


  }

  navigateToSistemas() {
    this.router.navigate(['sistemas']);
  }


}
