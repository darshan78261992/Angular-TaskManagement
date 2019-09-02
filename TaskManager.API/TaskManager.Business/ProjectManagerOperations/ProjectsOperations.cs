using System;
using System.Collections.Generic;
using TaskManager.DAL;
using TaskManager.Model;

namespace TaskManager.Business
{
    public class ProjectsOperations : IDisposable
    {
        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        public List<ProjectModel> GetProjectDetails()
        {
            try
            {
                using (var repository = new ProjectRepository())
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
        public List<ProjectModel> GetProjectDetails(string searchProject)
        {
            try
            {
                using (var repository = new ProjectRepository())
                {
                    var taskdetails = repository.GetDetails(searchProject);
                    return taskdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ProjectModel GetProjectDetailsById(int id)
        {
            try
            {
                using (var repository = new ProjectRepository())
                {
                    var projectdetails = repository.GetDetailsById(id);
                    return projectdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool InsertProjectDetail(ProjectModel projectModel)
        {
            try
            {
                using (var repository = new DAL.ProjectRepository())
                {
                    return repository.Insert(projectModel);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateProjectDetail(ProjectModel projectModel)
        {
            try
            {
                using (var repository = new DAL.ProjectRepository())
                {
                    return repository.Update(projectModel);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool DeleteProjectById(int projectId)
        {
            try
            {
                using (var repository = new DAL.ProjectRepository())
                {
                    return repository.DeleteById(projectId);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
