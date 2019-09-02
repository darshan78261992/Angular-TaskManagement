using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Model
{
    public class ProjectModel
    {
        public int ProjectId { get; set; }
        public string Projects { get; set; }
        public int ManagerId { get; set; }
        public int Priority { get; set; }
        public int TotalTask { get; set; }
        public int Completed { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
