import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginObject: logindetails
constructor(private http:HttpClient, private router:Router){
  this.loginObject = new logindetails()
}

onLogin(){
this.http.post("http://localhost:5000/users/login", this.loginObject).subscribe((res:any)=>{
  if(res.result){
    alert("login success")
    this.router.navigateByUrl('/dashboard')
  }else{
    alert(res.message)
  }
})
}
}

export class logindetails{
  email: string
  password:string

  constructor(){

    this.email ="";
    this.password ="";
  }
}
