using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.DAL
{
    public class Project
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectId { get; set; }
        public string Projects { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Priority { get; set; }
       // public int ManagerId { get; set; }
        //public int UsersId { get; set; }
        //public int TaskId { get; set; }
        public virtual ICollection<Users> Users { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
