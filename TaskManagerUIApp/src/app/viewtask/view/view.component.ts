import { Component, OnInit } from '@angular/core';
import { Itask } from 'src/app/taskmodel/Itask';
import { TaskManagerService } from 'src/app/service/TaskManager.Service';
import { ProjectService } from 'src/app/service/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  display = 'none';
  Taskdisplay = 'none';
  errorMessage = '';
  tasks: Itask[] = [];
  taskUpdate: Itask;
  items = [];
  Project: string;
  ProjectId: number;

  TaskId: number;
  ParentTask: string | null;
  Task: string;
  StartDate: string;
  EndDate: string;
  Priority: number;
  Status: string;

  UserId: number;
  dateFormat = new DatePipe("en-US");
  startDateSortCount = 0;
  endDateSortCount = 0;
  prioritySortCount = 0;

  constructor(private taskmanagerService: TaskManagerService, private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.taskmanagerService.getTaskManagerDetails().subscribe(
      taskList => {
        this.tasks = taskList;
      },
      error => this.errorMessage = <any>error
    );
  }

  public onDeleteClick(taskId) {
    //console.log(task.UserTaskId);
    this.taskmanagerService.deleteTaskManagerDetails(taskId).subscribe(
      taskList => {
        this.taskmanagerService.getTaskManagerDetails().subscribe(
          taskList => {
            this.tasks = taskList;
          },
          error => this.errorMessage = <any>error
        );
      });
  }

  public openProjectModal() {
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
      });
  }

  onCloseHandled() {
    this.display = 'none';
  }

  selectedItem: any = { id: '', name: '' };
  onSelect(manager): void {
    console.log(manager);
    this.selectedItem = manager;
  }

  onClickSearchFilter() {
    if (this.selectedItem) {
      this.Project = this.selectedItem.name;
      this.ProjectId = this.selectedItem.id;
    }
    this.taskmanagerService.getTaskDetailsByProjectId(this.ProjectId).subscribe(
      taskList => {
        this.tasks = taskList;
      },
      error => this.errorMessage = <any>error
    );
    this.display = 'none';
  }

  public EditTask(taskId) {
    // alert(taskId);
    this.taskmanagerService.getTaskManagerDetailsById(taskId).subscribe(
      task => {
        this.TaskId = task[0].TaskId;
        this.Task = task[0].Task;
        this.Priority = task[0].Priority;
        this.ParentTask = task[0].ParentTask;
        this.StartDate = this.dateFormat.transform(task[0].StartDate, 'yyyy-MM-dd');
        this.EndDate = this.dateFormat.transform(task[0].EndDate, 'yyyy-MM-dd');
        this.Status = task[0].Status;
      },
      error => this.errorMessage = <any>error
    );
    this.Taskdisplay = 'block';
  }

  closeModalDialog() {
    this.Taskdisplay = 'none';
  }

  public onModelSubmit(frm, form) {
    this.taskUpdate = {
      ParentTask: null,
      TaskId: form.task_Id, ParentTaskId: 0, Task: form.taskDetail, ProjectId: 0,
      StartDate: form.startDate, EndDate: form.endDate, UserId: 0, Status: "",
      Priority: form.Priority, IsParent: false
    };
    this.taskmanagerService.updateTaskManagerDetails(this.taskUpdate).subscribe(
      taskList => {
        this.taskmanagerService.getTaskManagerDetails().subscribe(
          taskList => {
            this.tasks = taskList;
          },
          error => this.errorMessage = <any>error
        );
        alert("The Records has succussfully Updated.")
        this.Taskdisplay = 'none';
      });
  }

  public EndTask(taskId) {
    this.taskmanagerService.updateTaskEnd(taskId).subscribe(
      taskList => {
        alert("Task has completed.")
        this.Taskdisplay = 'none';
      });
  }

  clearSearch() {
    this.ProjectId = null;
    this.Project = "";
    this.taskmanagerService.getTaskManagerDetails().subscribe(
      taskList => {
        this.tasks = taskList;
      },
      error => this.errorMessage = <any>error
    );
  }

  TaskSort(sortBy) {    
    switch (sortBy) {
      case "startDate":
        if (this.startDateSortCount == 0) {// ascending sorting
          this.tasks = this.tasks.sort(function (a, b) { return new Date(a.StartDate).getDate() - new Date(b.StartDate).getDate() });
          this.startDateSortCount++;
        } else {//descending sorting
          this.tasks = this.tasks.sort(function (a, b) { return new Date(b.StartDate).getDate() - new Date(a.StartDate).getDate() });
          this.startDateSortCount = 0;
        }
        break;
        break;
      case "endDate":
        if (this.endDateSortCount == 0) {// ascending sorting
          this.tasks = this.tasks.sort(function (a, b) { return new Date(a.EndDate).getDate() - new Date(b.EndDate).getDate() });
          this.endDateSortCount++;
        } else {//descending sorting
          this.tasks = this.tasks.sort(function (a, b) { return new Date(b.EndDate).getDate() - new Date(a.EndDate).getDate() });
          this.endDateSortCount = 0;
        }
        break;
      case "priority":
        if (this.prioritySortCount == 0) {// ascending sorting
          this.tasks = this.tasks.sort(function (a, b) { return a.Priority - b.Priority });
          this.prioritySortCount++;
        } else {//descending sorting
          this.tasks = this.tasks.sort(function (a, b) { return b.Priority - a.Priority });
          this.prioritySortCount = 0;
        }
        break;
      case "completed":
        this.tasks = this.tasks.sort(function (a, b) { return parseInt(b.Status) - parseInt(a.Status) });
        break;

    }
  }
}
