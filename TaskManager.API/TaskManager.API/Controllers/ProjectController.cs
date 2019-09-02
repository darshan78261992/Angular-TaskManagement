using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
//using System.Web.Http.Cors;
using TaskManager.Business;
using TaskManager.Model;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/Project")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProjectController : ApiController, IDisposable
    {
        // GET api/values
        public List<ProjectModel> GetTaskDetails()
        {
            try
            {
                using (var project = new ProjectsOperations())
                {
                    return project.GetProjectDetails();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<ProjectModel> GetTaskDetails(string searchProject)
        {
            try
            {
                using (var project = new ProjectsOperations())
                {
                    return project.GetProjectDetails(searchProject);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ProjectModel GetTaskDetailsById(int projectId)
        {
            try
            {
                using (var project = new ProjectsOperations())
                {
                    return project.GetProjectDetailsById(projectId);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        // POST api/values
        public bool Post([FromBody]ProjectModel record)
        {
            try
            {
                using (var projectOperation = new ProjectsOperations())
                {
                    return projectOperation.InsertProjectDetail(record);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // PUT api/values/5
        public bool Put([FromBody]ProjectModel record)
        {
            try
            {
                bool success = false;
                using (var projectOpertaion = new ProjectsOperations())
                {
                    success = projectOpertaion.UpdateProjectDetail(record);
                }
                return success;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // DELETE api/values/5
        public bool Delete(int id)
        {
            try
            {
                using (var projectOperation = new ProjectsOperations())
                {
                    return projectOperation.DeleteProjectById(id);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}