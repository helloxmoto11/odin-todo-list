import StorageHelper from "./storage.js";
import {Todo, Category} from "./todo";
import UiBuilder from "./ui";
import "./style.css";

class App {
    constructor() {
        this.storageHelper = new StorageHelper();
        this.uiBuilder = new UiBuilder();
    }

    run() {
        // Check if local storage is empty. If it is, pre-populate with initial project/todos
        if (this.storageHelper.size() === 0) {
            console.log("Local storage is empty. initializing...");
            this.#initializeProjects();
        }
        const projects = this.storageHelper.getAllItems();
        console.log(projects);
        console.log(projects.toSorted((a,b) => a.name.length - b.name.length));
        this.uiBuilder.render(projects);
    }

    #initializeProjects() {
        const category = new Category("First Category");
        const todo = new Todo(
            "Do Laundry",
            "I need to do all my laundry",
            "2026-01-02",
            "HIGH",
            false,
        );
        const todo2 = new Todo(
            "Study Thai",
            "Stop being lazy",
            "2026-01-04",
            "HIGH",
            false,
        );
        const todo3 = new Todo(
            "Grocery Shopping",
            "Time to buy food!",
            "2026-01-04",
            "HIGH",
            false,
        );
        category.addTodo(todo);
        category.addTodo(todo2);
        category.addTodo(todo3);

        const category2 = new Category("Second Category");
        const todo4 = new Todo(
            "Iron Clothes",
            "Get ready for work",
            "2026-01-05",
            "LOW",
            true,
        );
        category2.addTodo(todo4);
        this.storageHelper.save(category);
        this.storageHelper.save(category2);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const app = new App();
    app.run();
});
