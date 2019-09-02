import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Iproject } from 'src/app/taskmodel/Iproject';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.css']
})
export class ViewprojectComponent implements OnInit {

  errorMessage = '';
  projects: Iproject[] = [];
  projectDetail: Iproject;
  startDateSortCount = 0;
  endDateSortCount = 0;
  priorityDateSortCount = 0;
  completedDateSortCount = 0;
  @Output() valueProjectUpdate = new EventEmitter();
  @Input() project: string;
  constructor(private projectService: ProjectService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']) {
      this.projectService.getProjectDetails().subscribe(
        projectList => {
          this.projects = projectList;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  ngOnInit(): void {
    this.projectService.getProjectDetails().subscribe(
      projectList => {
        this.projects = projectList;
      },
      error => this.errorMessage = <any>error
    );
  }
  public onUpdateProjectClick(project) {
    debugger

    this.projectService.getProjectDetailsById(project.ProjectId).subscribe(
      projectList => {
        //this.projectDetail = projectList;   
        this.valueProjectUpdate.emit(projectList);
      },
      error => this.errorMessage = <any>error
    );


    console.log(project.Projects);
  }
  public onDeleteUserClick(project) {
    //console.log(user.UserId);
    this.projectService.deleteProjectDetails(project.prjectid).subscribe(
      taskList => {
        this.projectService.getProjectDetails().subscribe(
          projectList => {
            this.projects = projectList;
            alert("The Records has succussfully deleted.")
          },
          error => this.errorMessage = <any>error
        );
      });
  }

  public searchProject(event) {
    if (event.target.value != '') {
      this.projectService.getSearchProjectDetails(event.target.value).subscribe(
        projectList => {
          this.projects = projectList;
        },
        error => this.errorMessage = <any>error
      );
    } else {
      this.projectService.getProjectDetails().subscribe(
        projectList => {
          this.projects = projectList;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  public ProjectSort(sortBy: string) {  
      
    switch (sortBy) {
      case 'startDate':
        if (this.startDateSortCount == 0) {// ascending sorting
          this.projects = this.projects.sort(function (a, b) { return new Date(a.StartDate).getDate() - new Date(b.StartDate).getDate() });
          this.startDateSortCount++;
        } else {//descending sorting
          this.projects = this.projects.sort(function (a, b) { return new Date(b.StartDate).getDate() - new Date(a.StartDate).getDate() });
          this.startDateSortCount = 0;
        }
        break;
      case 'endDate':
        if (this.endDateSortCount == 0) {// ascending sorting
          this.projects = this.projects.sort(function (a, b) { return new Date(a.EndDate).getDate() - new Date(b.EndDate).getDate() });
          this.endDateSortCount++;
        } else {//descending sorting
          this.projects = this.projects.sort(function (a, b) { return new Date(b.EndDate).getDate() - new Date(a.EndDate).getDate() });
          this.endDateSortCount = 0;
        }
        break;
      case 'priority':
        if (this.priorityDateSortCount == 0) {// ascending sorting
          this.projects = this.projects.sort(function (a, b) { return parseInt(a.Priority) - parseInt(b.Priority) });
          this.priorityDateSortCount++;
        } else {//descending sorting
          this.projects = this.projects.sort(function (a, b) { return parseInt(b.Priority) - parseInt(a.Priority) });
          this.priorityDateSortCount = 0;
        }
        break;
      case 'completed':
        if (this.completedDateSortCount == 0) {// ascending sorting
          this.projects = this.projects.sort(function (a, b) { return a.Completed - b.Completed });
          this.completedDateSortCount++;
        } else {//descending sorting
          this.projects = this.projects.sort(function (a, b) { return b.Completed - a.Completed });
          this.completedDateSortCount = 0;
        }
        break;
    }
  }
}
