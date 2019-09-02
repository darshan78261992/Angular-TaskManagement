export interface Itask {
  TaskId: number;
  ParentTask: string | null;
  Status: string;
 // Project: string;
//  User: string;
  Task: string;
  StartDate: Date;
  EndDate: Date;
  Priority: number;
  IsParent: boolean;
  ParentTaskId:number;
  UserId:number;
  ProjectId:number;
}