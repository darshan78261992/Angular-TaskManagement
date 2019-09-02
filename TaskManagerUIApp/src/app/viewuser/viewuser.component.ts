import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Iuser } from 'src/app/taskmodel/Iuser';
import { UserService } from 'src/app/service/user.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  errorMessage = '';
  users: Iuser[] = [];
  firstNameSortCount = 0;
  lastNameSortCount = 0;
  empIdSortCount = 0;
  @Output() valueUpdate = new EventEmitter();
  @Input() user: string;
  constructor(private userService: UserService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['user']) {
      this.userService.getUserDetails().subscribe(
        userList => {
          this.users = userList;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      userList => {
        this.users = userList;
      },
      error => this.errorMessage = <any>error
    );
  }

  public onEditUserClick(user) {
    this.valueUpdate.emit(user);
    //console.log(user.UserId);
  }

  public onDeleteUserClick(user) {
    //console.log(user.UserId);
    this.userService.deleteUserDetails(user.UserId).subscribe(
      taskList => {
        this.userService.getUserDetails().subscribe(
          userList => {
            this.users = userList;
            alert("The Records has succussfully deleted.")
          },
          error => this.errorMessage = <any>error
        );
      });
  }

  public UserSort(sortBy: string) {
    switch (sortBy) {
      case "firstName":
        if (this.firstNameSortCount == 0) {// ascending sorting
          this.users = this.users.sort(function (a, b) { return a.FirstName.localeCompare(b.FirstName) });
          this.firstNameSortCount++;
        } else {//descending sorting
          this.users = this.users.sort(function (a, b) { return b.FirstName.localeCompare(a.FirstName) });
          this.firstNameSortCount = 0;
        }
        break;
      case "lastName":
        if (this.lastNameSortCount == 0) {// ascending sorting
          this.users = this.users.sort(function (a, b) { return a.LastName.localeCompare(b.LastName) });
          this.lastNameSortCount++;
        } else {//descending sorting
          this.users = this.users.sort(function (a, b) { return b.LastName.localeCompare(a.LastName) });
          this.lastNameSortCount = 0;
        }
        break;
      case "empId":
        if (this.empIdSortCount == 0) {
          this.users = this.users.sort(function (a, b) { return a.EmployeeId - b.EmployeeId });
          this.empIdSortCount++;
        } else {
          this.users = this.users.sort(function (a, b) { return b.EmployeeId - a.EmployeeId });
          this.empIdSortCount = 0;
        }
        break;
    }
  }

  public searchUser(event) {
    if (event.target.value != '') {
      this.userService.getUserBySearch(event.target.value).subscribe(
        userList => {
          this.users = userList;
        },
        error => this.errorMessage = <any>error
      );
    } else {
      this.userService.getUserDetails().subscribe(
        userList => {
          this.users = userList;
        },
        error => this.errorMessage = <any>error
      );
    }
  }
}
