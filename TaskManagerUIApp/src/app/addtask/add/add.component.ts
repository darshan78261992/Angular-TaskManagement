import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from 'src/app/service/TaskManager.Service';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { Itask } from 'src/app/taskmodel/Itask';
import { Iproject } from 'src/app/taskmodel/Iproject';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/taskmodel/Iuser';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errorMessage = '';
  prntTask: string;
  prntTaskId: string;
  modalTitle: string;
  tasks: Itask;
  project: Iproject;
  usre: Iuser;
  formUser = {};
  items = [];
  display = 'none';
  parentTaskdisplay = 'none';
  Projects: string;
  ProjectId: number;
  uname: string;
  unameId: string;
  Priority: string = "0";
  TaskDetails: string;
  IsParent: boolean = false;
  constructor(private taskmanagerService: TaskManagerService, private router: Router,
    private projectService: ProjectService, private userService: UserService) {

  }

  ngOnInit() {

  }
  openprojectModal() {
    this.modalTitle = "Project List";
    this.items = [];
    this.projectService.getProjectDetails().subscribe(
      projList => {
        for (var i = 0; i < projList.length; i++) {
          var obj = {
            "id": projList[i].ProjectId,
            "name": projList[i].Projects,
            "filterby": "projectfiltr"
          };

          this.items.push(obj);
        }
        this.display = 'block';
      }
    );
  }

  openuserModal() {
    this.modalTitle = "User List";
    this.items = [];
    this.userService.getUserDetails().subscribe(
      usList => {
        for (var i = 0; i < usList.length; i++) {
          var obj = {
            "id": usList[i].UserId,
            "name": usList[i].FirstName,
            "filterby": "userfiltr"
          };

          this.items.push(obj);
        }
        this.display = 'block';
      }
    );
  }

  openparenttaskModal() {
    this.modalTitle = "Parent Task List";
    this.items = [];


    this.taskmanagerService.getParentTaskDetails(true).subscribe(
      taskList => {
        //this.items = taskList;
        for (var i = 0; i < taskList.length; i++) {
          this.items.push({ id: taskList[i].ParentId, name: taskList[i].ParentTaskDetail, filterby: 'parenttaskfiltr' })
        }
      },
      error => this.errorMessage = <any>error
    );
    this.display = 'block';
  }

  selectedItem: any = { id: '', name: '', filterby: '' };
  onSelect(manager): void {
    console.log(manager);
    this.selectedItem = manager;
  }


  onClickSearchFilter() {
    if (this.selectedItem) {
      if (this.selectedItem.filterby == "projectfiltr") {
        this.Projects = this.selectedItem.name;
        this.ProjectId = this.selectedItem.id;
      }
      if (this.selectedItem.filterby == "userfiltr") {
        this.uname = this.selectedItem.name;
        this.unameId = this.selectedItem.id;
      }
      if (this.selectedItem.filterby == "parenttaskfiltr") {
        this.prntTask = this.selectedItem.name;
        this.prntTaskId = this.selectedItem.id;
      }
    }
    this.display = 'none';
  }
  onCloseHandled() {
    this.display = 'none';
  }

  public onSubmit(frm, form) {
    debugger
    this.tasks = {
      ParentTask:null,
      TaskId: null, ParentTaskId: form.parentTask_Id, Task: form.taskDetail, ProjectId: form.project_Id,
      StartDate: form.startDate, EndDate: form.endDate, UserId: form.uname_Id, Status: "Created",
      Priority: form.priority, IsParent: this.IsParent
    };

    this.taskmanagerService.addTaskManagerDetails(this.tasks).subscribe(
      taskList => {
        this.IsParent ? alert("Parent Task has succussfully saved.") : alert("Task has succussfully saved.");
        frm.submitted = false;
        this.Priority = "0";
        this.IsParent = false;
        frm.reset();
      },
      error => this.errorMessage = <any>error
    );
  }


  public onResetClick(frm, form) {
    frm.submitted = false;
    
    frm.reset();
    this.Priority = "0";
  }
  public changeCheck(event) {
    if (event.target.checked) {
      this.IsParent = true;
    } else {
      this.IsParent = false;
    }
  }
  
}


