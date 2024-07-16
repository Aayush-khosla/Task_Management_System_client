import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  loginpage:boolean=true;

  Userform: FormGroup= new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    cpassword: new FormControl(),
    
});

formvalue:any;

http = inject(HttpClient)

onsave(){
  this.formvalue = this.Userform.value;
  // this.http.post()


}
}
