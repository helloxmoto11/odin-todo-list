import {Category} from "./todo";

export default class StorageHelper {
    #storage;

    #DATA_KEY = "todo-data";

    constructor() {
        this.#storage = window.localStorage;
    }

    size() {
        return this.#storage.length;
    }

    save(categories) {
        this.#storage.setItem(this.#DATA_KEY, JSON.stringify(categories));
    }

    getCategory(name) {
        const data = this.#storage.getItem(name.replaceAll(" ", "-"));
        if (data) {
            return Category.fromJSON(data)
        } else {
            console.log(`Category ${name} not found.`);
        }
    }

    getAllCategories() {
        const rawData = this.#storage.getItem(this.#DATA_KEY);
        if (!rawData) {
            return []
        }
        const data = JSON.parse(rawData);
        return data.map((item) => Category.fromJSON(item));
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