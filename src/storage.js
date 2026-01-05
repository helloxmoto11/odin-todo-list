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

    getItem(key) {
        return this.#storage.getItem(key);
    }

    getAllItems() {
        const projects = [];
        const allItems = Object.entries(this.#storage);
        allItems.forEach(([key, value]) => {
            console.log(value)
            const firstProject = JSON.parse(value);
            projects.push(Category.fromJSON(JSON.stringify(firstProject)));
        })
        return projects;
    }

    remove(key) {
        this.#storage.removeItem(key);
    }

    removeAll(key) {
        this.#storage.clear();
    }

    update(key, value) {
        this.#storage.setItem(key, value);
    }
}