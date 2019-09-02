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
    public class UsersControllerTest
    {
        [Test]
        public void GetTaskDetails()
        {
            // Arrange
            UsersController controller = new UsersController();

            // Act
            List<UsersModel> result = controller.GetTaskDetails();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
            Assert.AreEqual(1, result.ElementAt(0).UserId);
        }

        [Test]
        public void Post()
        {
            // Arrange
            UsersModel record = new UsersModel() {
                FirstName="John",
                LastName="trump",
                EmployeeId=321,
            };
            UsersController controller = new UsersController();

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
            int userID = 0;
            UsersController controller = new UsersController();
            List<UsersModel> result = controller.GetTaskDetails();
            userID = result.ElementAt(0).UserId;
            UsersModel record = new UsersModel()
            {
                UserId= userID,
                FirstName = "John",
                LastName = "trump",
                EmployeeId = 321,
            };

            // Act
            var success = controller.Put(record);

            // Assert
            // Assert
            Assert.IsNotNull(success);
            Assert.AreEqual(true, success);
        }

        [Test]
        public void Delete()
        {
            // Arrange
            int userID = 0;
            UsersController controller = new UsersController();
            List<UsersModel> result = controller.GetTaskDetails();
            userID = result.ElementAt(0).UserId;

            // Act
            var success = controller.Delete(userID);

            // Assert
            Assert.IsNotNull(success);
            Assert.AreEqual(true, success);
        }
    }
}
