import { Project } from "./project";
import { Task } from "./task";
import { all, today, thisWeek, priority, byProject } from "./filterTasks";

class UI {
  createProjectForm() {
    const projects = document.querySelector(".projects");
    const addProject = document.querySelector(".add-project");

    const form = document.createElement("form");
    form.classList.add("new-project-form");
    form.innerHTML = `
    <input type="text" name="projName" placeholder="Project Name">
    <button class="new-proj-btn" id="create-project">Add</button>
    <button class="new-proj-btn" id="cancel-project">Cancel</button>
    `;

    projects.insertBefore(form, projects.firstChild);

    addProject.style.display = "none";
  }

  addProject(project) {
    const projects = document.querySelector(".projects");
    // console.log(project.title);
    const newProject = document.createElement("div");
    newProject.classList.add("project");
    newProject.innerHTML = `
    <i class="fa-solid fa-bars"></i>
    <button class="project-name">${project.title}</button>
    `;

    projects.appendChild(newProject);
  }

  cancelProject() {
    const form = document.querySelector(".new-project-form");
    const addProject = document.querySelector(".add-project");
    form.remove();
    form.style.display = "none";
    addProject.style.display = "block";
  }

  resetForm() {
    const form = document.querySelector(".new-project-form");
    const addProject = document.querySelector(".add-project");
    form.reset();
    form.style.display = "none";
    addProject.style.display = "block";
  }

  showMessage(msg, status) {
    if (status === "success") {
      console.log(msg);
      return;
    } else {
      alert(msg);
    }
  }

  changeActive(target) {
    const buttons = document.querySelectorAll(".task");
    buttons.forEach((button) => {
      if (button !== target) {
        button.classList.remove("active");
      }
    });
    target.classList.add("active");
  }

  changeTitle(title) {
    const currentTitle = document.querySelector("#title");
    currentTitle.innerText = title;
  }

  showAddTaskBtn() {
    const content = document.querySelector("#content");
    const cards = document.querySelector("#todo-cards");

    if (content.querySelector("#add-task-btn")) return;
    if (
      content.querySelector("#title").textContent === "Home" ||
      content.querySelector("#title").textContent === "Today" ||
      content.querySelector("#title").textContent === "This Week" ||
      content.querySelector("#title").textContent === "Important"
    )
      return;

    const btn = document.createElement("button");
    btn.classList.add("add-task-btn");
    btn.setAttribute("id", "add-task-btn");
    btn.textContent = "+";
    content.insertBefore(btn, cards);
  }

  removeAddTaskBtn() {
    const content = document.querySelector("#content");
    const btn = content.querySelector("#add-task-btn");
    if (btn) content.removeChild(btn);
  }

  createTaskForm() {
    this.removeAddTaskBtn();

    const content = document.querySelector("#content");
    const cards = document.querySelector("#todo-cards");

    if (content.querySelector(".new-task-form")) return;

    const form = document.createElement("form");
    const project = content.querySelector("#title").textContent;
    form.classList.add("new-task-form");
    form.innerHTML = `
      <div class="form-row">
        <label for="task_title">Title</label>
        <input
          type="text"
          name="task_title"
          id="task_title"
          placeholder="Finish Debugging Project"
        />
      </div>
      <div class="form-row">
      <label for="due_date">Due Date</label>
      <input type="date" name="due_date" id="due_date" />
      </div>
      <div class="form-row">
        Project: ${project}
      </div>
      <div class="form-row">
        <label for="priority">Important</label>
        <input type="checkbox" name="priority" id="priority" />
      </div>
      <div class="form-row">
        <button class="submit-task-btn" id="submit-task-btn">Add Task</button>
        <button class="cancel-task-btn">Cancel</button>
      </div>
    `;

    content.insertBefore(form, cards);
  }

  cancelTask() {
    const form = document.querySelector(".new-task-form");
    if (form) {
      form.remove();
    }
    this.showAddTaskBtn();
  }

  addTask(task) {
    // console.log(task);
    this.showAddTaskBtn();
    const cards = document.querySelector("#todo-cards");
    const newTask = document.createElement("div");

    newTask.classList.add("todo");
    newTask.innerHTML = `
      <div class="todo-item">
      <div class="todo-item-name-category">
        <p class="todo-item-priority ${task.important ? "priority" : ""}">
          ${task.important ? "*" : ""}
        </p>
        <p class="todo-item-name">${task.title}</p>
        -
        <p class="todo-proj">${task.project}</p>
      </div>
      <p class="due-date">${task.dueDate}</p>
    </div>
    <button class="task-btn" id="not-complete">X</button>
    `;

    cards.appendChild(newTask);
  }
}

const DOM_EVENTS = () => {
  const ui = new UI();

  document.addEventListener("click", (e) => {
    if (e.target.matches("#add-project-btn")) {
      ui.createProjectForm();
    }

    if (e.target.matches("#create-project")) {
      e.preventDefault();
      const form = document.querySelector(".new-project-form");
      const projectTitle = form.projName.value;

      if (projectTitle === "")
        return ui.showMessage("Please fill in your project name", "alert");

      if (projectTitle.length > 15)
        return ui.showMessage(
          "Project names can not be longer than 15 characters",
          "alert"
        );

      const project = new Project(projectTitle);
      ui.addProject(project);
      ui.resetForm();
      ui.showMessage(`Project ${project.title} added successfully`, "success");
    }

    if (e.target.matches("#cancel-project")) {
      e.preventDefault();
      ui.cancelProject();
    }

    if (e.target.matches("#home")) {
      ui.changeActive(e.target);
      ui.changeTitle("Home");
      ui.removeAddTaskBtn();
      ui.cancelTask();
      all();
    }

    if (e.target.matches("#today")) {
      ui.changeActive(e.target);
      ui.changeTitle("Today");
      ui.removeAddTaskBtn();
      ui.cancelTask();
      today();
    }

    if (e.target.matches("#week")) {
      ui.changeActive(e.target);
      ui.changeTitle("This Week");
      ui.removeAddTaskBtn();
      ui.cancelTask();
      thisWeek();
    }

    if (e.target.matches("#important")) {
      ui.changeActive(e.target);
      ui.changeTitle("Important");
      ui.removeAddTaskBtn();
      ui.cancelTask();
      priority();
    }

    if (e.target.matches(".project-name")) {
      ui.changeActive(e.target);
      ui.changeTitle(e.target.textContent);
      ui.showAddTaskBtn();
      ui.cancelTask();
      byProject(e.target);
    }

    if (e.target.matches("#add-task-btn")) {
      ui.createTaskForm();
    }

    if (e.target.matches("#submit-task-btn")) {
      e.preventDefault();
      const form = document.querySelector(".new-task-form");
      console.log(form.task_title.value);
      if (form.task_title.value === "" || form.due_date.value === "") {
        console.log("nope");
        return ui.showMessage(
          "Please fill in all the fields appropriately.",
          "alert"
        );
      }
      const project = document.querySelector("#title").textContent;
      const task = new Task(
        form.task_title.value,
        project,
        form.due_date.value,
        form.priority.checked
      );

      ui.addTask(task);
      ui.cancelTask();
      ui.showMessage(`Task ${task.title} added successfully`, "success");
    }

    if (e.target.matches(".cancel-task-btn")) {
      e.preventDefault();
      ui.cancelTask();
    }
  });
};

export { DOM_EVENTS, UI };