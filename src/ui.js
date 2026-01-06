import nav from "./nav";
import Card, {CreateFlippableTodoCard,} from "./card";

export default class UiBuilder {
  #selectedProject;
  #projects;
  #onDeleteTodo;
  #onAddCategory;

  constructor() {
    this.app = document.getElementById("app");
    this.#selectedProject = "First Category";
  }

  #onSelectProject(name) {
    this.#selectedProject = name;
    this.render(this.#projects, this.#onDeleteTodo);
  }

  buildNav(projects) {
    nav(
      projects,
      this.#selectedProject,
      (name) => this.#onSelectProject(name),
      (newProjectName) => this.#onSelectProject(newProjectName),
    );
  }

  buildCards(projects) {
    const project = projects.find(
      (project) => project.name === this.#selectedProject,
    );
    const todos = project.todos;
    todos.forEach((todo) => {
      this.app.appendChild(
        Card(
          todo.getId(),
          todo.getTitle(),
          todo.getDescription(),
          todo.getDate(),
          todo.getPriority(),
          todo.getCompleted(),
          () => this.#onDeleteTodo(this.#selectedProject, todo.getId()),
        ),
      );
    });
    this.app.appendChild(CreateFlippableTodoCard());
  }

  render(projects, onDeleteTodo, onAddCategory) {
    this.#projects = projects;
    this.#onDeleteTodo = onDeleteTodo;
    this.#onAddCategory = onAddCategory;
    this.app.replaceChildren();
    this.buildNav(projects);
    this.buildCards(projects);
  }
}
