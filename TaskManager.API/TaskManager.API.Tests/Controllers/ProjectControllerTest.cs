using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API.Controllers;
using TaskManager.Model;

namespace TaskManager.API.Tests
{
    [TestFixture]
    public class ProjectControllerTest
    {
        [Test]
        public void GetTaskDetails()
        {
            // Arrange
            ProjectController controller = new ProjectController();

            // Act
            List<ProjectModel> result = controller.GetTaskDetails();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            Assert.AreEqual(3, result.ElementAt(0).ProjectId);
            Assert.AreEqual(1, result.ElementAt(1).ProjectId);
        }

        [Test]
        public void Post()
        {
            // Arrange
            ProjectModel record = new ProjectModel()
                { ManagerId= 3211,
            Priority= 5, Projects= "Task Manager", StartDate = DateTime.Now,EndDate= DateTime.Now};
            ProjectController controller = new ProjectController();

            // Act
            var result = controller.Post(record);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(true, result);
        }

        [Test]
        public void Put()
        {
            // Arrange
            int projectId = 0;
            ProjectController controller = new ProjectController();
            List<ProjectModel> result = controller.GetTaskDetails();
            projectId = result.ElementAt(0).ProjectId;
            ProjectModel record = new ProjectModel()
            {
                ProjectId = projectId,
                ManagerId = 3511,
                Priority = 4,
                Projects = "Task Manager1",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now
            };

            // Act
            var success = controller.Put(record);

            // Assert
            Assert.IsNotNull(success);
            Assert.AreEqual(true, success);
        }

        [Test]
        public void Delete()
        {
            // Arrange
            int projectId = 0;
            ProjectController controller = new ProjectController();
            List<ProjectModel> result = controller.GetTaskDetails();
            projectId = result.ElementAt(0).ProjectId;

            // Act
            var success = controller.Delete(projectId);

            // Assert
            Assert.IsNotNull(success);
            Assert.AreEqual(true, success);
        }
    }
}
