import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule,LoginComponent,SignupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
