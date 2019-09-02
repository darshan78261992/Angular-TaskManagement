using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using TaskManager.Model;
namespace TaskManager.DAL
{
    public class TaskRepository : ITaskManagerRepository<TaskModel>, IDisposable
    {
        public TaskRepository()
        {
        }
        public bool Insert(TaskModel userTaskModel)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    if (userTaskModel.IsParent)
                    {
                        var parentTask = new Parent()
                        {
                            ParentTaskDetail = userTaskModel.Task
                        };
                        context.ParentTasks.Add(parentTask);
                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        var userTask = new Task()
                        {
                            ParentId = userTaskModel.ParentTaskId,
                            TasksDetail = userTaskModel.Task,
                            StartDate = userTaskModel.StartDate,
                            EndDate = userTaskModel.EndDate,
                            Priority = userTaskModel.Priority,
                            ProjectId = userTaskModel.ProjectId,
                            Status = userTaskModel.Status,
                            // UsersId = userTaskModel.UserId                        
                        };

                        context.Tasks.Add(userTask);
                        context.SaveChanges();

                        var user = context.Users.Find(userTaskModel.UserId);
                        user.TaskId = userTask.TaskId;
                        context.Entry(user).State = EntityState.Modified;
                        context.SaveChanges();
                        return true;
                    }
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }

        public List<TaskModel> GetDetails()
        {
            List<TaskModel> taskModelList;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    taskModelList = (from u in context.Tasks
                                     select new TaskModel()
                                     {
                                         TaskId = u.TaskId,
                                         Task = u.TasksDetail,
                                         ParentTaskId = u.ParentId,
                                         ParentTask = u.ParentTask.ParentTaskDetail,
                                         EndDate = u.EndDate,
                                         StartDate = u.StartDate,
                                         Priority = u.Priority,
                                         ProjectId = u.ProjectId,
                                         Status = u.Status == "Completed" ? "1" : "0",
                                     }).OrderByDescending(a => a.TaskId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return taskModelList;
        }
        public List<TaskModel> GetDetails(int taskId)
        {
            List<TaskModel> taskModelList;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    taskModelList = (from u in context.Tasks
                                     where u.TaskId == taskId
                                     select new TaskModel()
                                     {
                                         TaskId = u.TaskId,
                                         Task = u.TasksDetail,
                                         ParentTaskId = u.ParentId,
                                         ParentTask = u.ParentTask.ParentTaskDetail,
                                         EndDate = u.EndDate,
                                         StartDate = u.StartDate,
                                         Priority = u.Priority,
                                         ProjectId = u.ProjectId,
                                         Status = u.Status
                                     }).OrderByDescending(a => a.TaskId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return taskModelList;
        }
        public List<TaskModel> GetTaskDetailsByProjectId(int projectId)
        {
            List<TaskModel> taskModelList;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    taskModelList = (from u in context.Tasks
                                     where u.ProjectId == projectId
                                     select new TaskModel()
                                     {
                                         TaskId = u.TaskId,
                                         Task = u.TasksDetail,
                                         ParentTaskId = u.ParentId,
                                         ParentTask = u.ParentTask.ParentTaskDetail,
                                         EndDate = u.EndDate,
                                         StartDate = u.StartDate,
                                         Priority = u.Priority,
                                         ProjectId = u.ProjectId,
                                         Status = u.Status
                                     }).OrderByDescending(a => a.TaskId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return taskModelList;
        }
        public List<ParentModel> GetDetails(bool isParent)
        {
            List<ParentModel> parentTaskList;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    parentTaskList = (from u in context.ParentTasks
                                      select new ParentModel()
                                      {
                                          ParentId = u.ParentId,
                                          ParentTaskDetail = u.ParentTaskDetail
                                      }).OrderByDescending(a => a.ParentId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return parentTaskList;
        }

        public bool Update(TaskModel userTaskModel)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var taskModel = (from c in context.Tasks
                                     where c.TaskId == userTaskModel.TaskId
                                     select c).FirstOrDefault();
                    if (taskModel == null)
                    {
                        return false;
                    }
                    taskModel.TasksDetail = userTaskModel.Task;
                    taskModel.Priority = userTaskModel.Priority;
                    taskModel.StartDate = userTaskModel.StartDate;
                    taskModel.StartDate = userTaskModel.EndDate;

                    context.Tasks.Add(taskModel);
                    context.Entry(taskModel).State = EntityState.Modified;
                    context.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }
        public bool Update(int taskId)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var task = context.Tasks.Find(taskId);
                    if (task == null)
                    {
                        return false;
                    }
                    task.Status = "Completed";

                    context.Tasks.Add(task);
                    context.Entry(task).State = EntityState.Modified;
                    context.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool DeleteById(int id)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var taskModel = context.Tasks.Find(id);
                    if (taskModel == null)
                    {
                        return false;
                    }

                    var user = context.Users.FirstOrDefault(x => x.TaskId == taskModel.TaskId);
                    if (user != null)
                    {
                        user.TaskId = null;
                        user.Tasks = null;
                        context.Entry(user).State = EntityState.Modified;
                        context.SaveChanges();
                    }



                    context.Tasks.Remove(taskModel);
                    context.Entry(taskModel).State = EntityState.Deleted;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
