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

    saveTodo(categoryName, todo) {
        const categories = this.getAllCategories();
        const category = categories.find((category) => category.name === categoryName);
        if (category) {
            category.todos.push(todo);
        } else {
            throw new Error(`${categoryName} not found`);
        }
        this.save(categories);
    }

    updateTodo(selectedCategory, updatedTodo) {
        const categories = this.getAllCategories();
        const category = categories.find((cat) => cat.name === selectedCategory);

        if (category) {
            const index = category.todos.findIndex((t) => t.getId() === updatedTodo.getId());
            if (index !== -1) {
                category.todos[index] = updatedTodo;
                this.save(categories);
            }
        }
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

    deleteCategory(categoryId) {
        const categories = this.getAllCategories();
        this.save(categories.filter(category => category.id !== categoryId));
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

}