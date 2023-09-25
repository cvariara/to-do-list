document.addEventListener("DOMContentLoaded", () => {
  createProject();
})

export function createProject() {
  const projects = document.querySelector(".projects");
  const addProject = document.querySelector(".add-project");
  const project = document.createElement("div");
  // const controls = document.createElement('i')
  addProject.addEventListener("click", () => {
    addProject.style.display = "none";
    const form = document.createElement("form");
    form.classList.add('new-project-form');

    const newProjName = document.createElement("input");
    newProjName.setAttribute("type", "text");
    newProjName.setAttribute("name", "new-proj");
    newProjName.setAttribute("class", "new-proj-name");
    newProjName.setAttribute("placeholder", "Project Name");

    const newProjAddButton = document.createElement("button");
    newProjAddButton.setAttribute("id", "create-project");
    newProjAddButton.setAttribute("type", "submit");
    newProjAddButton.textContent = "+";

    form.appendChild(newProjName);
    form.appendChild(newProjAddButton);
    projects.insertBefore(form, projects.firstChild);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      test();
      form.reset();
    })
  });


  projects.appendChild(project);
}

function test() {
  console.log('yessir');
}
