using System;
using System.Collections.Generic;
using TaskManager.DAL;
using TaskManager.Model;

namespace TaskManager.Business
{
    public class TaskOperations : IDisposable
    {
        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        public List<TaskModel> GetTaskDetails()
        {
            try
            {
                using (var repository = new TaskRepository())
                {
                    var taskdetails = repository.GetDetails();
                    return taskdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<TaskModel> GetTaskDetails(int taskId)
        {
            try
            {
                using (var repository = new TaskRepository())
                {
                    var taskdetails = repository.GetDetails(taskId);
                    return taskdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<TaskModel> GetTaskDetailsByProjectId(int projectId)
        {
            try
            {
                using (var repository = new TaskRepository())
                {
                    var taskdetails = repository.GetTaskDetailsByProjectId(projectId);
                    return taskdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ParentModel> GetTaskDetails(bool isParent)
        {
            try
            {
                using (var repository = new TaskRepository())
                {
                    var taskdetails = repository.GetDetails(isParent);
                    return taskdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool InsertTask(TaskModel taskEntity)
        {
            try
            {
                using (var repository = new DAL.TaskRepository())
                {
                    return repository.Insert(taskEntity);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateTask(TaskModel taskEntity)
        {
            try
            {
                using (var repository = new DAL.TaskRepository())
                {
                    return repository.Update(taskEntity);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool UpdateTask(int taskId)
        {
            try
            {
                using (var repository = new DAL.TaskRepository())
                {
                    return repository.Update(taskId);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool DeleteTaskById(int taskId)
        {
            try
            {
                using (var repository = new DAL.TaskRepository())
                {
                    return repository.DeleteById(taskId);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
