import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { users } from '../../interface/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'Start managing your Projects';

  myFormReg!: FormGroup;
  successMessage:string ="";
  showSuccessMessage:boolean=false;

  constructor(private fb: FormBuilder, public regServices:UserService, private router:Router) {
    this.myFormReg = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerUser() {
    if (this.myFormReg.valid) {

      console.log(this.myFormReg.value);
      const details:users = this.myFormReg.value;

this.regServices.signUpUser(details).subscribe((res)=>{
  console.log(res)
})

this.successMessage = 'Signup successful';
this.showSuccessMessage = true;

this.myFormReg.reset();


  setTimeout(() => {
      this.showSuccessMessage = false;
      this.router.navigate((['/login']));
  }, 2000);

    } else {
      console.log("Form is not valid");
      this.myFormReg.markAllAsTouched();
    }
  }

  Tologins(){
    this.router.navigate((['/login']));
  }
}
