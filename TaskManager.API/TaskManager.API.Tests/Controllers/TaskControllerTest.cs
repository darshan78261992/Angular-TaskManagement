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
    public class TaskControllerTest
    {
        [Test]
        public void GetTaskDetails()
        {
            // Arrange
            TaskController controller = new TaskController();

            // Act
            List<TaskModel> result = controller.GetTaskDetails();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
            Assert.AreEqual(1, result.ElementAt(0).TaskId);
        }

        [Test]
        public void Post()
        {
            // Arrange
            TaskModel record = new TaskModel()
            { Task ="Current Task",
              ParentTask ="Parent Task",
              ProjectId =7,
              Priority= 2,
              Status ="Completed",
              UserId =1,
              StartDate =DateTime.Now,
              EndDate =DateTime.Now
            };
            TaskController controller = new TaskController();

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
            TaskController controller = new TaskController();
            int taskID = 0;
            List<TaskModel> result = controller.GetTaskDetails();
            taskID = result.ElementAt(0).TaskId;
            TaskModel record = new TaskModel()
            {
                TaskId = taskID,
                Task = "Current Task",
                ParentTask = "Parent Task",
                //ProjectId = "Project Manager",
                Priority = 2,
                Status = "Completed",
                //User = "ABC",
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
            TaskController controller = new TaskController();
            int taskID = 0;
            List<TaskModel> result = controller.GetTaskDetails();
            taskID = result.ElementAt(0).TaskId;

            // Act
            var success = controller.Delete(taskID);

            // Assert
            Assert.IsNotNull(success);
            Assert.AreEqual(true, success);
        }
    }
}
