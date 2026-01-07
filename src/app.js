import StorageHelper from "./storage.js";
import {Todo, Category} from "./todo";
import UiBuilder from "./ui";
import "./style/style.css";
import "./style/nav.css";
import "./style/card.css";

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
        const categories = this.storageHelper.getAllCategories();
        this.uiBuilder.render(
            categories,
            (categoryName, todo) => this.handleAddTodo(categoryName, todo),
            (categoryName, todoId) => this.handleDeleteTodo(categoryName, todoId),
            (newCategoryName) => this.handleAddCategory(newCategoryName),
            (categoryId) => this.handleDeleteCategory(categoryId),
            (selectedCategory, completed, todo) => this.handleOnCompletedChange(selectedCategory, completed, todo),
        );
    }

    handleAddTodo(categoryName, todo) {
        this.storageHelper.saveTodo(categoryName, todo);
        this.run();
    }

    handleOnCompletedChange(selectedCategory, completed, todo) {
        todo.setCompleted(completed);
        this.storageHelper.updateTodo(selectedCategory, todo);
        this.run();
    }

    handleDeleteTodo(categoryName, todoId) {
        console.log(`Delete ${categoryName}: ${todoId}`);
        this.storageHelper.deleteTodo(categoryName, todoId);
        this.run();
    }

    handleAddCategory(categoryName) {
        const allCategories = this.storageHelper.getAllCategories();
        allCategories.push(new Category(categoryName));
        this.storageHelper.save(allCategories);
        this.run();
    }

    handleDeleteCategory(categoryId) {
        this.storageHelper.deleteCategory(categoryId);
        this.run();
    }

    #initializeProjects() {
        const category = new Category("First Category");
        const todo = new Todo(
            "Do Laundry",
            "I need to do all my laundry",
            "2026-01-02",
            "LOW",
            false,
        );
        const todo2 = new Todo(
            "Study Thai",
            "Stop being lazy",
            "2026-01-04",
            "IMPORTANT",
            false,
        );
        const todo3 = new Todo(
            "Grocery Shopping",
            "Time to buy food!",
            "2026-01-04",
            "URGENT",
            false,
        );
        category.addTodo(todo);
        category.addTodo(todo2);
        category.addTodo(todo3);

        this.storageHelper.save([category]);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const app = new App();
    app.run();
});
