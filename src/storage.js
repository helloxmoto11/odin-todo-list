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
        const rawData = this.#storage.getItem(this.#DATA_KEY);
        if (rawData) {
            const data = JSON.parse(rawData);
            const category = data.find((category) => category.name === name);
            return Category.fromJSON(category);
        } else {
            throw new Error("Category not found: " + name);
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
        const categories = this.getAllCategories();
        if (categories.length) {
            const category = categories.find(category => category.name === categoryName);
            if (!category) {
                throw new Error("Category not found: " + categoryName);
            }
            category.todos = category.todos.filter(todo => todo.getId() !== todoId);
            this.save(categories);
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