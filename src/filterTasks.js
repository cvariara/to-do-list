import { isToday, isThisWeek } from "date-fns";

const all = () => {
  const tasks = document.querySelectorAll("#todo-cards .todo");
  Array.from(tasks).forEach((task) => {
    task.style.display = "flex";
  });
};

const today = () => {
  const tasks = document.querySelectorAll("#todo-cards .todo .due-date");
  Array.from(tasks).forEach((task) => {
    task.parentElement.parentElement.style.display = "flex";
    let result = isToday(new Date(task.textContent));
    if (!result) {
      task.parentElement.parentElement.style.display = "none";
    }
  });
};

const thisWeek = () => {
  const tasks = document.querySelectorAll("#todo-cards .todo .due-date");
  Array.from(tasks).forEach((task) => {
    task.parentElement.parentElement.style.display = "flex";
    let result = isThisWeek(new Date(task.textContent));
    if (!result) {
      task.parentElement.parentElement.style.display = "none";
    }
  });
};

const priority = () => {
  const tasks = document.querySelectorAll("#todo-cards .todo");
  Array.from(tasks).forEach((task) => {
    const priorityElement = task.querySelector(".todo-item-priority");
    if (priorityElement && !priorityElement.classList.contains("priority")) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
};

const byProject = (project) => {
  const tasks = document.querySelectorAll("#todo-cards .todo");
  Array.from(tasks).forEach((task) => {
    const projectTitle = task.querySelector(".todo-proj").textContent;
    if (project.textContent !== projectTitle) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
};

export { all, today, thisWeek, priority, byProject };
