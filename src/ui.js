import nav from "./nav";
import Card, {CreateFlippableTodoCard,} from "./card";

export default class UiBuilder {
    #selectedCategory;
    #categories;
    #onDeleteTodo;
    #onAddCategory;
    #onDeleteCategory;
    #onAddTodo;
    #onCompletedChange;

    constructor() {
        this.app = document.getElementById("app");
        this.heading = document.getElementById("main-heading");
    }

    #onSelectProject(name) {
        this.#selectedCategory = name;
        this.render(this.#categories, this.#onDeleteTodo, this.#onAddCategory, this.#onDeleteCategory);
    }

    buildNav(projects) {
        nav(
            projects,
            this.#selectedCategory,
            (name) => this.#onSelectProject(name),
            (newProjectName) => this.#onAddCategory(newProjectName),
            (categoryId) => {
                this.#selectedCategory = undefined;
                this.#onDeleteCategory(categoryId)

            }
        );
    }

    buildCards(categories) {
        if (categories.length === 0) {
            return;
        }
        const category = categories.find(
            (cat) => cat.name === this.#selectedCategory,
        );
        if (category.todos) {
            const todos = category.todos;
            todos.forEach((todo) => {
                this.app.appendChild(
                    Card(
                        todo.getId(),
                        todo.getTitle(),
                        todo.getDescription(),
                        todo.getDate(),
                        todo.getPriority(),
                        todo.getCompleted(),
                        (completed) => this.#onCompletedChange(this.#selectedCategory,completed, todo),
                        () => this.#onDeleteTodo(this.#selectedCategory, todo.getId()),
                    ),
                );
            });
        }
        this.app.appendChild(CreateFlippableTodoCard((todo) => this.#onAddTodo(this.#selectedCategory, todo)));
    }

    render(categories, onAddTodo, onDeleteTodo, onAddCategory, onDeleteCategory, onCompletedChange) {
        if (!this.#selectedCategory && categories.length) {
            this.#selectedCategory = categories[0].name;
        }
        this.heading.innerText = this.#selectedCategory ? this.#selectedCategory : "";
        this.#categories = categories;
        this.#onDeleteTodo = onDeleteTodo;
        this.#onAddCategory = onAddCategory;
        this.#onDeleteCategory = onDeleteCategory;
        this.#onAddTodo = onAddTodo;
        this.#onCompletedChange = onCompletedChange;
        this.app.replaceChildren();
        this.buildNav(categories);
        this.buildCards(categories);
    }
}
