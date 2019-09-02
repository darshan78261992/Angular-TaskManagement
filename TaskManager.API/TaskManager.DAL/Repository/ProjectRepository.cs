using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using TaskManager.Model;
namespace TaskManager.DAL
{
    public class ProjectRepository : ITaskManagerRepository<ProjectModel>, IDisposable
    {
        public ProjectRepository()
        {
        }
        public bool Insert(ProjectModel userModel)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var project = new Project()
                    {
                        Projects = userModel.Projects,
                        Priority = userModel.Priority,
                        // ManagerId = userModel.ManagerId,
                        StartDate = userModel.StartDate,
                        EndDate = userModel.EndDate,
                        //Users = userModel.
                    };
                    context.Projects.Add(project);
                    context.SaveChanges();

                    var user = context.Users.Find(userModel.ManagerId);
                    user.ProjectId = project.ProjectId;
                    context.Entry(user).State = EntityState.Modified;
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        public List<ProjectModel> GetDetails()
        {
            List<ProjectModel> projectModel;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    projectModel = (from u in context.Projects
                                    select new ProjectModel()
                                    {
                                        ProjectId = u.ProjectId,
                                        Projects = u.Projects,
                                        Priority = u.Priority,
                                        StartDate = u.StartDate,
                                        EndDate = u.EndDate,
                                        TotalTask = u.Tasks.ToList().Count(),
                                        Completed = u.Tasks.Where(x => x.Status == "Completed").ToList().Count()
                                        //          ManagerId = u.UsersId                                                                       
                                    }).OrderByDescending(a => a.ProjectId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return projectModel;
        }

        public List<ProjectModel> GetDetails(string searchProject)
        {
            List<ProjectModel> projectModel;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    projectModel = (from u in context.Projects
                                    where u.Projects.Contains(searchProject)
                                    select new ProjectModel()
                                    {
                                        ProjectId = u.ProjectId,
                                        Projects = u.Projects,
                                        Priority = u.Priority,
                                        StartDate = u.StartDate,
                                        EndDate = u.EndDate,
                                        TotalTask = u.Tasks.ToList().Count(),
                                        Completed = u.Tasks.Where(x => x.Status == "Completed").ToList().Count()
                                        //          ManagerId = u.UsersId                                                                       
                                    }).OrderByDescending(a => a.ProjectId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return projectModel;
        }

        public ProjectModel GetDetailsById(int id)
        {
            ProjectModel projectModel;
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var project = context.Projects.Find(id);
                    var user = project.Users.FirstOrDefault();
                    projectModel = new ProjectModel()
                    {
                        EndDate = project.EndDate,
                        Priority = project.Priority,
                        ProjectId = project.ProjectId,
                        Projects = project.Projects,
                        StartDate = project.StartDate,
                        EmployeeName = user != null ? user.FirstName + " " + user.LastName : "",
                        ManagerId = user != null ? user.UsersId : 0
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return projectModel;
        }

        public bool Update(ProjectModel userTaskModel)
        {
            try
            {
                using (var context = new TaskManagerDbContext())
                {
                    var projectModel = (from c in context.Projects
                                        where c.ProjectId == userTaskModel.ProjectId
                                        select c).FirstOrDefault();
                    if (projectModel == null)
                    {
                        return false;
                    }
                    projectModel.Projects = userTaskModel.Projects;
                    projectModel.Priority = userTaskModel.Priority;
                    //projectModel.UsersId = userTaskModel.ManagerId;
                    projectModel.StartDate = userTaskModel.StartDate;
                    projectModel.EndDate = userTaskModel.EndDate;

                    //context.Projects.Add(projectModel);
                    context.Entry(projectModel).State = EntityState.Modified;
                    context.SaveChanges();

                    var user = context.Users.FirstOrDefault(x => x.ProjectId == projectModel.ProjectId);
                    user.ProjectId = null;
                    context.Entry(user).State = EntityState.Modified;
                    context.SaveChanges();

                    var updateUser = context.Users.Find(userTaskModel.ManagerId);
                    updateUser.ProjectId = projectModel.ProjectId;
                    context.Entry(updateUser).State = EntityState.Modified;
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
                    var projectModel = (from c in context.Projects
                                        where c.ProjectId == id
                                        select c).FirstOrDefault();
                    if (projectModel == null)
                    {
                        return false;
                    }
                    context.Projects.Remove(projectModel);
                    context.Entry(projectModel).State = EntityState.Deleted;
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
