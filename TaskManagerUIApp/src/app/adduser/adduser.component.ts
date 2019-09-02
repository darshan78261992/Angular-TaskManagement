import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.Service';
import { Iuser } from 'src/app/taskmodel/Iuser';
import { Router } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  errorMessage = '';
  pageTitle: string = "Add Task";
  user: Iuser;
  userid: number;
  lstname: string = '';
  fstname: string = '';
  btnadd: string = '';
  empid: number;
  istrue: boolean = false;

  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit() {
  }
  getUpdatedvalue($event) {
    
    console.log($event.UserId);
    this.userid = $event.UserId
    this.fstname = $event.FirstName;
    this.lstname = $event.LastName;
    this.empid = $event.EmployeeId
    this.istrue = true;
    document.getElementById('btnadditem').innerHTML = "Update";
  }

  public onSubmit(reForm, form) {
    this.istrue = false;
    console.log(form);

    this.user = {
      UserId: this.userid, FirstName: form.firstname, LastName: form.lastname,
      EmployeeId: form.employid
    };
    //alert(form.employid);
    if (document.getElementById('btnadditem').innerHTML == "Update") {
      this.userService.updateUserDetails(this.user).subscribe(
        taskList => {
          alert("The Records has succussfully updated.")
          document.getElementById('btnadditem').innerHTML = "Add";
          this.istrue = false;
          reForm.submitted = false;
          reForm.reset();
        });
    }
    else {
      this.userService.addUserDetails(this.user).subscribe(
        taskList => {
          alert("The Records has succussfully saved.")
          reForm.submitted = false;
          reForm.reset();
          // window.location.reload();
          //this.router.navigate(['/adduser']);
        });
    }

  }

  public onResetClick(form) {
    
    form.submitted = false;
    form.reset();
    document.getElementById('btnadditem').innerHTML = "Add";
    this.istrue = false;
  }


}
