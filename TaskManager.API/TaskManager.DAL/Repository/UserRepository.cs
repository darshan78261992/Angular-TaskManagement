using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using TaskManager.Model;
namespace TaskManager.DAL
{
    public class UserRepository : ITaskManagerRepository<UsersModel>, IDisposable
    {
        public UserRepository()
        {
        }
        public bool Insert(UsersModel userModel)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var user = new Users()
                    {
                        FirstName = userModel.FirstName,
                        LastName = userModel.LastName,
                        EmployeeId = userModel.EmployeeId
                    };
                    context.Users.Add(user);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        public List<UsersModel> GetDetails()
        {
            List<UsersModel> usersList;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    usersList = (from u in context.Users
                                     select new UsersModel()
                                     {
                                         UserId = u.UsersId,
                                         FirstName = u.FirstName,
                                         LastName = u.LastName,
                                         EmployeeId = u.EmployeeId
                                     }).OrderByDescending(a => a.UserId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return usersList;
        }

        public List<UsersModel> GetDetails(string searchString)
        {
            List<UsersModel> usersList;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    usersList = (from u in context.Users
                                 where u.FirstName.Contains(searchString) || u.LastName.Contains(searchString)
                                 select new UsersModel()
                                 {
                                     UserId = u.UsersId,
                                     FirstName = u.FirstName,
                                     LastName = u.LastName,
                                     EmployeeId = u.EmployeeId
                                 }).OrderByDescending(a => a.UserId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return usersList;
        }

        public bool Update(UsersModel userTaskModel)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var taskModel = (from c in context.Users
                                     where c.UsersId == userTaskModel.UserId
                                     select c).FirstOrDefault();
                    if(taskModel== null)
                    {
                        return false;
                    }
                    taskModel.FirstName = userTaskModel.FirstName;
                    taskModel.LastName = userTaskModel.LastName;
                    taskModel.EmployeeId = userTaskModel.EmployeeId;

                    context.Users.Add(taskModel);
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

        public bool DeleteById(int id)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var taskModel = (from c in context.Users
                                     where c.UsersId == id
                                     select c).FirstOrDefault();
                    if (taskModel == null)
                    {
                        return false;
                    }
                    context.Users.Remove(taskModel);
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
