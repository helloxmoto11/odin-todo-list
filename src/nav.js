

export default function Nav(projects, selectedProject, onSelectProject) {
    const nav = document.querySelector("nav");
    nav.replaceChildren()
    const title = document.createElement("h1");
    title.innerText = "Odin Todo List";

    nav.appendChild(title);

    const navInner = document.createElement("div");
    navInner.classList.add("nav-inner");
    const projectsTitle = document.createElement("h3");
    projectsTitle.innerText = "Categories";
    navInner.appendChild(projectsTitle);


    projects.forEach((project) => {
        const projWrapper = document.createElement("div");
        projWrapper.classList.add("proj-wrapper");
        const proj = document.createElement("p");
        proj.innerText = project.name;
        if (project.name === selectedProject) {
            projWrapper.classList.add("selected-proj-wrapper");
        }

        projWrapper.addEventListener("click", () => {
            onSelectProject(project.name)
        })
        projWrapper.appendChild(proj);
        navInner.appendChild(projWrapper);
    })
    nav.append(navInner);
}
