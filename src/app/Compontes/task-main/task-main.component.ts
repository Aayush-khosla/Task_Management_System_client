import { CommonModule, DatePipe, JsonPipe, NgFor, NgStyle, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';



interface Task {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  historyLog: Array<{ changeType: string; timestamp: Date; details: string }>;
}

@Component({
  selector: 'app-task-main',
  standalone: true,
  imports: [NgStyle,NgFor,ReactiveFormsModule,JsonPipe,DatePipe,UpperCasePipe,CommonModule],
  templateUrl: './task-main.component.html',
  styleUrl: './task-main.component.css'
})



export class TaskMainComponent {
  // title, description, dueDate, priority
  Taskform: FormGroup= new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    dueDate: new FormControl(),
    priority: new FormControl(),
    status:new FormControl()
  });



  newtask:any;
  changed_status:boolean=false;
  user: any;
  username: any = localStorage.getItem('username');
  title:string="Task Management System "
  http = inject(HttpClient);
  router = inject(Router)
   alltask :any ;
   viewtask:any;
  openaddvew:boolean=false;

   editedTask: any;
  constructor(){   
  //  this.http.get("")
    this.rendertask();
  }
  temp :any;



  selectedTask:any;

  sortByDueDate() {
    this.viewtask.sort((a:any, b:any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

   sortByPriority() {
    const priorityOrder: { [key: string]: number } = { 'low': 1, 'medium': 2, 'high': 3 };
    this.viewtask.sort((a:any, b:any) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  sortByStatus() {
    const statusOrder: { [key: string]: number } = { 'to-do': 1, 'in-progress': 2, 'completed': 3 };
    this.viewtask.sort((a:any, b:any) => statusOrder[a.status] - statusOrder[b.status]);
  }

  clear(){
    this.viewtask = this.alltask;
    this.rendertask()
  }

  openViewModal(task: any) {
    this.selectedTask = task;
  }

  closeViewModal() {
    this.selectedTask = null;
    if(this.changed_status){
      this.rendertask()
    }
    this.changed_status =false;
  }

  delete(i:any){
    
    this.http.get(`https://task-management-system-server-51p2.onrender.com/api/task/del/${i}`).subscribe((res:any)=>{
      if(res.ans){
          this.rendertask()
      }else{
        alert(res.error)
      }
    })

  
  }
  openaddmodal(){
    this.openaddvew =true;
  }
  Addtask(){
    this.newtask = this.Taskform.value;

    this.http.post("https://task-management-system-server-51p2.onrender.com/api/task/" , this.newtask).subscribe((res :any )=>{
      if(res.ans){
        this.openaddvew =false
        this.Taskform.reset();
        this.rendertask();
      }else{
        alert(res.error);
      }
    })

    console.log(this.newtask);



  }

  changeTaskStatus(i:string,id:string){
      this.changed_status =true;
      this.http.post(`https://task-management-system-server-51p2.onrender.com/api/task/change/${id}`, {status:i}).subscribe((res:any)=>{
        if(res.ans){
          alert("Status changed");
        }else{
          alert(res.error);
        }
      })
  }

  rendertask(){
      this.http.get("https://task-management-system-server-51p2.onrender.com/api/task/list").subscribe((res:any)=>{
        if(res.ans){
          if(res.tasks != ""){
            this.alltask = res.tasks;
            this.viewtask = this.alltask
          }
        }else {
          // alert(res.error);
          console.log(res)
        }
      })
  }

  


  openEditModal(task: any) {
    this.editedTask = task;
    // task.dueDate = {{task.dueDate|date:'yyyy-mm-dd' }}
    // task.dueDate = DatePipe.transform(task.dueDate, 'yyyy-MM-dd');
    this.Taskform.patchValue(task);
  }

  closeEditModal() {
    this.Taskform.reset();
    this.editedTask = null;
    this.rendertask();
  }

  randome :any;
  saveEditedTask() {


    console.log('Edited task:', this.editedTask._id);
    this.randome = this.Taskform.value;
    this.randome.dueDate = this.editedTask.dueDate;
    console.log( "----->" , this.randome)
    // console.log(this.editedTask)
    this.http.post(`https://task-management-system-server-51p2.onrender.com/api/task/update/${this.editedTask._id}` , this.randome).subscribe((res:any)=>{
      if(res.ans){
        this.closeEditModal(); 
      }else{
        alert(res.error);
        this.closeEditModal(); 
      }
    })
   
    
  }

  exportTasksToCSV(): void {
    const tasks = this.alltask
    const csvData = tasks.map((task:any) => ({
      Title: task.title,
      Description: task.description,
      'Due Date': new Date(task.dueDate).toISOString().split('T')[0], // Format date
      Priority: task.priority,
      Status: task.status
    }));

    const csvContent = [
      ['Title', 'Description', 'Due Date', 'Priority', 'Status'],
      ...csvData.map((task:any) => [
        task.Title,
        task.Description,
        task['Due Date'],
        task.Priority,
        task.Status,
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tasks.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  logout(){

    localStorage.setItem('mytoken' , "");
    this.router.navigateByUrl('login')

  }

}
