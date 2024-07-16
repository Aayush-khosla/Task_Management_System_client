import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink,AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginpage:boolean=true;

    router =inject(Router);
    logindetails : any ={
       "title" : "Login Help",
       "email" : "aayushkhosla16@gmail.com",
      "password" :"123" 
    };
    // constructor(){
    //   this.logindetails.title = "Login Help"
    //   this.logindetails.email = "aayushkhosla16@gmial.com"
    //   this.logindetails.password = "aayush" 
    // }

    Userform: FormGroup= new FormGroup({
        email: new FormControl(),
        password: new FormControl()
    });

    Userform1: FormGroup= new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      cpassword: new FormControl(),
      
  });


    something :any;
    formvalue:any;

    http = inject(HttpClient);


    toggel(){
      this.loginpage = !this.loginpage;
    }

    onsave(){
      this.formvalue = this.Userform.value;
      
        this.http.post("https://task-management-system-server-51p2.onrender.com/api/auth/login" , this.formvalue).subscribe((res:any)=>{
            if(res.ans){
              console.log(res);
              localStorage.setItem('mytoken' ,res.token);
              console.log(res.uname)
              localStorage.setItem('username' ,res.uname);
              this.router.navigateByUrl('dashbord');
            }else{
              this.something = res.error;
              console.log(res);
              alert(this.something);
            }

        })
    }

    onsave1(){
      this.formvalue = this.Userform1.value;
      this.http.post("https://task-management-system-server-51p2.onrender.com/api/auth/signup" , this.formvalue).subscribe((res:any)=>{
        if(res.ans){
          console.log(res)
          localStorage.setItem('mytoken' ,res.token);
          console.log(res.uname)
          localStorage.setItem('username' ,res.uname);
          this.router.navigateByUrl('dashbord');
        }else{
          alert(res.error);
        }
      })
    }
}
