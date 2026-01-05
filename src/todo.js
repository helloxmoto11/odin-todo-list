export class Todo {
    #id;
    #title;
    #description;
    #date;
    #priority;
    #completed;

    constructor(title, description, date, priority, completed, id = crypto.randomUUID()) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#date = date;
        this.#priority = priority;
        this.#completed = completed;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getDate() {
        return this.#date;
    }

    getPriority() {
        return this.#priority;
    }

    getCompleted() {
        return this.#completed;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            date: this.#date,
            priority: this.#priority,
            completed: this.#completed,
        }
    }
}

export class Category {

    constructor(name, todos = [], id = crypto.randomUUID()) {
        this.id = id;
        this.name = name;
        this.todos = todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    static fromJSON(jsonString) {
        const data = JSON.parse(jsonString);
        const todos = data.todos.map(todo => {
            return new Todo(todo.title, todo.description, todo.date, todo.priority, todo.completed, todo.id);
        })
        return new Category(data.name, todos, data.id);
    }
}

