import nav from "./nav";
import Card, {AddNewTodoCard, AddTodoFormCard, CreateFlippableTodoCard} from "./card";

export default class UiBuilder {
  #selectedProject;
  #projects;
  #onDeleteTodo;

  constructor() {
    this.app = document.getElementById("app");
    this.#selectedProject = "First Category";
  }

  #onSelectProject(name) {
    this.#selectedProject = name;
    this.render(this.#projects, this.#onDeleteTodo);
  }

  buildNav(projects) {
    nav(projects, this.#selectedProject, (name) => this.#onSelectProject(name));
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

  render(projects, onDeleteTodo) {
    this.#projects = projects;
    this.#onDeleteTodo = onDeleteTodo;
    this.app.replaceChildren();
    this.buildNav(projects);
    this.buildCards(projects);
  }
}
