import nav from "./nav";
import Card from "./card";

export default class UiBuilder {
    #selectedProject;
    #projects;

    constructor() {
        this.app = document.getElementById("app");
        this.#selectedProject = "First Project";
    }

    #onSelectProject(name) {
        this.#selectedProject = name;
        this.render(this.#projects);
    }

    buildNav(projects) {
        nav(projects, this.#selectedProject, (name) => this.#onSelectProject(name));
    }

    buildCards(projects) {
        const project = projects.find((project) => project.name === this.#selectedProject);
        console.log(project);
        const todos = project.todos;
        todos.forEach(todo => {
            this.app.appendChild(Card(todo.getTitle(), todo.getDescription(), todo.getDate(), todo.getPriority(), todo.getCompleted()));

        })
    }

    render(projects) {
        this.#projects = projects;
        this.app.replaceChildren();
        this.buildNav(projects);
        this.buildCards(projects);
    }
}



