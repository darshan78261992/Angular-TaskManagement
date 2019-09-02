import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { Iproject } from 'src/app/taskmodel/Iproject';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  errorMessage = '';
  pageTitle: string = "Add Task";
  project: Iproject;
  display = 'none';
  selectedItem: any = { id: '', name: '' };
  ManagerId: number;
  ProjectId: number;
  selectedmanager: string;
  ManagerName: string;

  Projects: string;
  Priority: string = "0";
  StartDate: string;
  EndDate: string;
  range: string;
  dateFormat = new DatePipe("en-US");
  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
  }
  Users: any[];
  disabledDate: Boolean = true;
  changeCheck(event, startDateInput, endDateInput) {
    this.disabledDate = !event.target.checked;
    if (event.target.checked) {
      startDateInput.type = "date";
      endDateInput.type = "date";
      startDateInput.required = true;
      endDateInput.required = true;
      var currentDate = new Date();
      this.StartDate = this.dateFormat.transform(currentDate, 'yyyy-MM-dd');
      this.EndDate = this.dateFormat.transform(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd');
    }
    else {

      startDateInput.type = "text";
      endDateInput.type = "text";
      startDateInput.required = false;
      endDateInput.required = false;
      startDateInput.value = "";
      endDateInput.value = "";
      startDateInput.placeholder = "Start Date";
      endDateInput.placeholder = "End Date";
      this.StartDate = "";
      this.EndDate = "";
    }
  }
  openModal() {

    this.userService.getUserDetails().subscribe(
      userList => {
        this.Users = userList;
        this.display = 'block';
      },
      error => this.errorMessage = <any>error
    );
  }
  onCloseHandled() {
    this.display = 'none';
  }
  ngOnInit() {
  }
  onSelect(manager): void {
    this.selectedItem = manager;
  }
  onSelectedManager1() {

    if (this.selectedItem) {
      this.ManagerId = this.selectedItem.EmployeeId;
      this.ManagerName = this.selectedItem.FirstName + " " + this.selectedItem.LastName;
    };
    this.display = 'none';
  }
  getProjectUpdatedvalue($event) {
    debugger
    if ($event.StartDate != null && $event.EndDate != null) {
      (document.getElementById('setStartEndDae') as HTMLInputElement).checked = true;
      (document.getElementById('startDate') as HTMLInputElement).type = 'date';
      (document.getElementById('endDate') as HTMLInputElement).type = 'date';
      (document.getElementById('startDate') as HTMLInputElement).disabled = false;
      (document.getElementById('endDate') as HTMLInputElement).disabled = false;
      (document.getElementById('startDate') as HTMLInputElement).required = true;
      (document.getElementById('endDate') as HTMLInputElement).required = true;
    }
    this.ProjectId = $event.ProjectId
    this.ManagerId = $event.ManagerId;
    this.Projects = $event.Projects;
    this.Priority = $event.Priority;
    this.ManagerName = $event.EmployeeName;
    this.StartDate = this.dateFormat.transform($event.StartDate, 'yyyy-MM-dd');
    this.EndDate = this.dateFormat.transform($event.EndDate, 'yyyy-MM-dd');;
    document.getElementById('btnaddproject').innerHTML = "Update";
  }
  public onSubmit(reForm, form) {
    console.log(form);
    debugger
    this.project = {
      ProjectId: this.ProjectId,
      ManagerId: this.ManagerId,
      Projects: form.projectname,
      Priority: form.range,
      StartDate: new Date(form.stDate),
      EndDate: new Date(form.eDate),
      TotalTask: 0,
      Completed: 0,
      EmployeeName: this.ManagerName
    };
    console.log(this.project);
    if (document.getElementById('btnaddproject').innerHTML == "Update") {
      this.projectService.updateProjectDetails(this.project).subscribe(
        taskList => {
          alert("The Records has succussfully updated.");
          document.getElementById('btnaddproject').innerHTML = "Add";
          this.Priority = "0";
          reForm.submitted = false;
          reForm.reset();
        });
    }
    else {
      this.projectService.addProjectDetails(this.project).subscribe(
        taskList => {
          alert("The Records has succussfully saved.");
          this.Priority = "0";
          reForm.submitted = false;
          reForm.reset();
        });
    }

  }

  public onResetClick(form) {
    form.submitted = false;
    form.reset();
    document.getElementById('btnaddproject').innerHTML = "Add";
    this.Priority = "0";
    //this.istrue = false;
  }

  public searchUser(event) {
    if (event.target.value != '') {
      this.userService.getUserBySearch(event.target.value).subscribe(
        userList => {
          this.Users = userList;
        },
        error => this.errorMessage = <any>error
      );
    } else {
      this.userService.getUserDetails().subscribe(
        userList => {
          this.Users = userList;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  public ValidDate(startDate, endDate) {
    var stDate = new Date(startDate.value);
    if (stDate > new Date(endDate.value)) {
      alert("End Date is not valid!!!");
      this.EndDate = this.dateFormat.transform(stDate.setDate(stDate.getDate() + 1), 'yyyy-MM-dd');
    }
  }
}


