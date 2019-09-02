import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskManagerService } from 'src/app/service/TaskManager.Service';
import { Itask } from 'src/app/taskmodel/Itask';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  task:any;
  userTaskId: any;
  parentId: any;
  tasks:Itask ;
  display='none'; 
  formUser = {};
  constructor( private route: ActivatedRoute,private taskmanagerService: TaskManagerService,private router: Router) {  
  }
  sdate:Date;
  edate:Date;
  tsk: string;
  psk:string;
  pror:string;
  ngOnInit() {
    this.display='block'; 
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.task = params;
    this.userTaskId = this.task.params.TaskId;
   // this.parentId = this.task.params.ParentId;
  });
  }

  public onModelSubmit(form) {
   
    //alert(form.value.straDate[0]);
    //alert(form.value.efDate[0]);
      // alert(form.value.efDate.parTask.value);
      

    // // this.tasks = {TaskId:parseInt(this.userTaskId, 10),
    // //   Task:form.name, 
    // //   ParentTask: form.parentTask,
    // //   StartDate:form.startDate, 
    // //   EndDate:form.endDate,
    // //   //Project:null,
    // //  // User:null,
    // //   Status:null,
    // //   Priority:form.endDate,
    // //   IsParent : false
    // // };
    //   console.log(this.tasks);
    //   this.taskmanagerService.updateTaskManagerDetails(this.tasks).subscribe(
    //     taskList => {
    //       alert("The Records has succussfully Updated.")
    //       this.router.navigate(['/viewtask']);
    //       this.display='none';
    //     });
  }
      
      
  public onResetModelClick(form){
    form.reset();
  }
}
