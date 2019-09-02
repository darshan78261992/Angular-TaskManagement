using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DAL
{
    public interface ITaskManagerRepository<TEntity> where TEntity : class
    {
        #region Methods
        bool Insert(TEntity entity);
        bool Update(TEntity entity);
        bool DeleteById(int id);
        //TEntity GetTaskDetailsById(int id);
        List<TEntity> GetDetails();
        #endregion
    }
}
