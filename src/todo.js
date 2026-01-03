export class Todo {
    #title;
    #description;
    #date;
    #priority;
    #completed;

    constructor(title, description, date, priority, completed) {
        this.#title = title;
        this.#description = description;
        this.#date = date;
        this.#priority = priority;
        this.#completed = completed;
    }

    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            date: this.#date,
            priority: this.#priority,
            completed: this.#completed,
        }
    }
}

export class Project {

    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    static fromJSON(jsonString) {
        const data = JSON.parse(jsonString);
        const todos = data.todos.map(todo => {
            return new Todo(todo.title, todo.description, todo.data, todo.priority, todo.completed);
        })
        return new Project(data.name, todos)


    }
}

