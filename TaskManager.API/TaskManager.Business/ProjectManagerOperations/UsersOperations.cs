using System;
using System.Collections.Generic;
using TaskManager.DAL;
using TaskManager.Model;

namespace TaskManager.Business
{
    public class UsersOperations : IDisposable
    {
        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        public List<UsersModel> GetUserDetails()
        {
            try
            {
                using (var repository = new UserRepository())
                {
                    var userdetails = repository.GetDetails();
                    return userdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<UsersModel> GetUserDetails(string searchString)
        {
            try
            {
                using (var repository = new UserRepository())
                {
                    var userdetails = repository.GetDetails(searchString);
                    return userdetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool InsertUserDetail(UsersModel userModel)
        {
            try
            {
                using (var repository = new DAL.UserRepository())
                {
                    return repository.Insert(userModel);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateUserDetail(UsersModel userModel)
        {
            try
            {
                using (var repository = new DAL.UserRepository())
                {
                    return repository.Update(userModel);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool DeleteUserById(int userId)
        {
            try
            {
                using (var repository = new DAL.UserRepository())
                {
                    return repository.DeleteById(userId);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

