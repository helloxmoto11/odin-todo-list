import StorageHelper from "./storage.js";
import { Todo, Project } from "./todo";

class App {
    constructor() {
        this.storageHelper = new StorageHelper();
    }

    run() {
        // Check if local storage is empty. If it is, pre-populate with initial project/todos
        if (this.storageHelper.size() === 0) {
            console.log("Local storage is empty. initializing...")
            this.#initializeProjects()
        } else {
            console.log("Local storage is not empty.")
            console.log("Retrieving objects from storage")
            const projects = this.storageHelper.getAllItems()
            console.log(projects);
        }

    }

    #initializeProjects() {
        const project = new Project("First Project");
        const todo = new Todo("Do Laundry", "I need to do all my laundry", "2026-01-02", "HIGH", false)
        project.addTodo(todo);
        this.storageHelper.save(project.name, JSON.stringify(project))
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    const app = new App()
    app.run()
})