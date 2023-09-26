export class Task {
  constructor(title, project, dueDate, important) {
    this.id = Date.now();
    this.title = title;
    this.project = project;
    this.dueDate = dueDate;
    this.important = important;
  }

  toJSON() {
    return {
      title: this.title,
      project: this.project,
      dueDate: this.dueDate,
      important: this.important,
    };
  }

  static fromJSON(data) {
    return new Task(data.title, data.project, data.dueDate, data.important);
  }
}
