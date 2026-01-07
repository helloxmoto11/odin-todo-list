import {Todo} from "./todo";

export default function Card(
    id,
    title,
    description,
    date,
    priority,
    completed,
    onCompletedChange,
    onDelete,
) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = title;

    const cardDescription = document.createElement("p");
    cardDescription.innerText = description;

    const cardDate = document.createElement("p");
    cardDate.innerText = date;

    const cardPriority = document.createElement("p");
    cardPriority.innerText = priority;

    const todoCompleted = document.createElement("input");
    todoCompleted.type = "checkbox";
    todoCompleted.addEventListener("change", (e) => {
        const completed = e.target.checked;
        onCompletedChange(completed);
    })
    todoCompleted.id = `completed-${id}`;
    todoCompleted.checked = completed;
    const completedLabel = document.createElement("label");
    completedLabel.innerText = "Completed";
    completedLabel.htmlFor = `completed-${id}`;
    const completedWrapper = document.createElement("div");
    completedWrapper.classList.add("completed-wrapper");
    completedWrapper.append(completedLabel, todoCompleted);

    const dateAndCompletedWrapper = document.createElement("div");
    dateAndCompletedWrapper.classList.add("dateAndCompleted");
    dateAndCompletedWrapper.append(cardDate, completedWrapper);

    const todoPriority = document.createElement("div");
    todoPriority.innerHTML = `Priority: <span class="priority ${priority.toLowerCase()}">${priority}</span>`;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-button";
    delBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        onDelete(id);
    });

    card.appendChild(dateAndCompletedWrapper);
    card.appendChild(cardTitle);
    card.appendChild(todoPriority);
    card.appendChild(cardDescription);
    card.appendChild(delBtn);

    return card;
}

export function AddNewTodoCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    const wrapper = document.createElement("div");
    wrapper.classList.add("new-card-wrapper");
    wrapper.innerHTML =
        '<button><span class="material-symbols-outlined add-icon">add</span></button>';
    card.appendChild(wrapper);
    return card;
}

export function AddTodoFormCard(onAddTodo) {
    const card = document.createElement("div");
    card.id = "add-todo-form";
    card.classList.add("card");
    const wrapper = document.createElement("div");
    wrapper.classList.add("add-todo-card-container");

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("input-wrapper");
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title";
    const titleInput = document.createElement("input");
    titleWrapper.append(titleLabel, titleInput);

    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add("input-wrapper");
    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Description";
    const descriptionInput = document.createElement("input");
    descriptionWrapper.append(descriptionLabel, descriptionInput);

    const dateWrapper = document.createElement("div");
    dateWrapper.classList.add("input-wrapper");
    const dateLabel = document.createElement("label");
    dateLabel.innerText = "Date";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = new Date().toISOString().slice(0, 10);
    dateWrapper.append(dateLabel, dateInput);

    const priorityWrapper = document.createElement("div");
    priorityWrapper.classList.add("input-wrapper");
    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority";
    const prioritySelect = document.createElement("select");
    const options = ["LOW", "IMPORTANT", "URGENT"];
    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option.toLowerCase();
        opt.innerText = option;
        prioritySelect.appendChild(opt);
    });
    priorityWrapper.append(priorityLabel, prioritySelect);

    const dateAndPriorityWrapper = document.createElement("div");
    dateAndPriorityWrapper.classList.add("dateAndPriority");
    dateAndPriorityWrapper.append(dateWrapper, priorityWrapper);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("input-button-wrapper");
    const cancelButton = document.createElement("button");
    cancelButton.addEventListener("click", (e) => {
        setTimeout(() =>{
            titleInput.value = "";
            descriptionInput.value = "";
            dateInput.value = new Date().toISOString().slice(0, 10);

        }, 600)
    })
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add("button-cancel");
    const addButton = document.createElement("button");
    addButton.addEventListener("click", () => {
        if (!titleInput.value) return;
        const newTodo = new Todo(
            titleInput.value,
            descriptionInput.value,
            dateInput.value,
            prioritySelect.value,
            false,
        );
        onAddTodo(newTodo);
    });
    addButton.innerText = "Add";
    addButton.classList.add("button-add");
    buttonWrapper.append(cancelButton, addButton);

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");
    inputContainer.append(
        titleWrapper,
        descriptionWrapper,
        dateAndPriorityWrapper,
    );
    wrapper.append(inputContainer, buttonWrapper);
    card.appendChild(wrapper);

    return card;
}

export function CreateFlippableTodoCard(onAddTodo) {
    const scene = document.createElement("div");
    scene.classList.add("scene");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    // 1. Create the Front (The "Add New" placeholder)
    const frontFace = AddNewTodoCard();
    frontFace.classList.add("card-face", "card-face--front");

    // 2. Create the Back (The Form)
    const backFace = AddTodoFormCard(onAddTodo);
    backFace.classList.add("card-face", "card-face--back");

    // Assemble
    cardInner.append(frontFace, backFace);
    scene.append(cardInner);

    // 3. Trigger the flip
    // Flip to form when clicking the placeholder
    frontFace.addEventListener("click", () => {
        cardInner.classList.add("is-flipped");
    });

    // Flip back when clicking "Cancel"
    const cancelButton = backFace.querySelector(".button-cancel");
    cancelButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent re-triggering frontFace click
        cardInner.classList.remove("is-flipped");
    });

    return scene;
}
