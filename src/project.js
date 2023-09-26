import { Task } from "./task";

export class Project {
  constructor(title) {
    this.id = Date.now();
    this.title = title;
    this.tasks = [];
  }

  toJSON() {
    return {
      title: this.title,
      tasks: this.tasks.map((task) => task.toJSON()),
    };
  }

  static fromJSON(data) {
    const project = new Project(data.title);
    project.tasks = data.tasks.map((taskData) => Task.fromJSON(taskData));
    return project;
  }
}
