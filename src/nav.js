

export default function Nav(projects, selectedProject, onSelectProject) {
    console.log(projects);
    const nav = document.querySelector("nav");
    nav.replaceChildren()
    const title = document.createElement("h1");
    title.innerText = "Odin Todo List";
    nav.appendChild(title);

    const projectsTitle = document.createElement("h3");
    projectsTitle.innerText = "Projects";
    nav.appendChild(projectsTitle);

    projects.forEach((project) => {
        const proj = document.createElement("p");
        proj.innerText = project.name;
        if (project.name === selectedProject) {
            proj.classList.add("selected-project");
        }

        proj.addEventListener("click", () => {
            onSelectProject(project.name)
        })
        nav.appendChild(proj);
    })
}
