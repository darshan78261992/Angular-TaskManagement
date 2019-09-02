using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.DAL
{
    public class Task
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TaskId { get; set; }

        public int? ParentId { get; set; }

        public int ProjectId { get; set; }

        //public int UsersId { get; set; }

        public string TasksDetail { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Priority { get; set; }

        public string Status { get; set; }

        public Parent ParentTask { get; set; }

        public Project Projects { get; set; }

        public virtual ICollection<Users> Users { get; set; }
    }
}
