import { Routes } from '@angular/router';
import { LoginComponent } from './Compontes/login/login.component';
import { TaskMainComponent } from './Compontes/task-main/task-main.component';
import { LayoutComponent } from './Compontes/layout/layout.component';
// import { SignupComponent } from './Compontes/signup/signup.component';

export const routes: Routes = [

   {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
   },
   {
        path:'login',
        component:  LoginComponent
   },
    {
    path:'',
    component: TaskMainComponent,
    children:[
        {
            path:'dashbord',
            component:TaskMainComponent
        }
    ]
   }
];
