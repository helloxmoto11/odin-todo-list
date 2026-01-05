import {Project} from "./todo";

export default class StorageHelper {
    #storage;

    constructor() {
        this.#storage = window.localStorage;
    }

    size() {
        return this.#storage.length;
    }

    save(key, value) {
        this.#storage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return this.#storage.getItem(key);
    }

    getAllItems() {
        const projects = [];
        const allItems = Object.entries(this.#storage);
        allItems.forEach(([key, value]) => {
            const firstProject = JSON.parse(value);
            projects.push(Project.fromJSON(firstProject))
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