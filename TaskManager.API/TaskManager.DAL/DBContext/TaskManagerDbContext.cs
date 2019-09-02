using System;
using System.Data.Entity;

namespace TaskManager.DAL
{
    class TaskManagerDbContext : DbContext
    {
        public TaskManagerDbContext() : base("name=DBConnectionString")
        {
            Database.SetInitializer<TaskManagerDbContext>(new TaskInitializer());
            Database.SetInitializer<TaskManagerDbContext>(new CreateDatabaseIfNotExists<TaskManagerDbContext>());

            Database.SetInitializer<TaskManagerDbContext>(new DropCreateDatabaseIfModelChanges<TaskManagerDbContext>());
        }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Parent> ParentTasks { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Task>()
            //.HasRequired<Parent>(s => s.ParentTask)
            //.WithMany(g => g.Tasks)
            //.HasForeignKey<int>(s => s.ParentId);

           // modelBuilder.Entity<Task>()
           // .HasRequired<Project>(s => s.Projects)
           // .WithMany(g => g.Taks)
           // .HasForeignKey<int>(s => s.ProjectId);

           // modelBuilder.Entity<Task>()
           //.HasRequired<Users>(s => s.Users)
           //.WithMany(g => g.Tasks)
           //.HasForeignKey<int>(s => s.UserId);

            //modelBuilder.Entity<Project>()
            //.HasRequired<Users>(s => s.Users)
            //.WithMany(g => g.Projects)
            //.HasForeignKey<int>(s => s.ManagerId)
            //.WillCascadeOnDelete(false);
        }
        public class TaskInitializer : DropCreateDatabaseIfModelChanges<TaskManagerDbContext>
        {
            #region Methods

            protected override void Seed(TaskManagerDbContext context)
            {
                base.Seed(context);
            }

            #endregion
        }
    }
}
