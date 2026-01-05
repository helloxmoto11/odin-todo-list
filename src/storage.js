import {Category} from "./todo";

export default class StorageHelper {
    #storage;

    constructor() {
        this.#storage = window.localStorage;
    }

    size() {
        return this.#storage.length;
    }

    save(category) {
        console.log(category);
        this.#storage.setItem(category.name.replaceAll(" ", "-"), JSON.stringify(category));
    }

    getCategory(name) {
        const data = this.#storage.getItem(name.replaceAll(" ", "-"));
        if (data) {
            return Category.fromJSON(data)
        } else {
            console.log(`Category ${name} not found.`);
        }
    }

    getAllItems() {
        const projects = [];
        const allItems = Object.entries(this.#storage);
        allItems.forEach(([key, value]) => {
            const firstProject = JSON.parse(value);
            projects.push(Category.fromJSON(JSON.stringify(firstProject)));
        })
        return projects;
    }

    deleteTodo(categoryName, todoId) {
        const data = this.#storage.getItem(categoryName.replaceAll(" ", "-"));
        if (data) {
            const category = Category.fromJSON(data);
            category.todos = category.todos.filter(todo => todo.getId() !== todoId);
            this.save(category);
        } else {
            console.log(`Category ${categoryName} not found!`);
        }
    }

    removeAll(key) {
        this.#storage.clear();
    }

    update(key, value) {
        this.#storage.setItem(key, value);
    }
}