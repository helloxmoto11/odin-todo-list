export default function Card(title, description, date, priority, completed, onDelete) {
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
    todoCompleted.id = `${title.replaceAll(' ', "-")}-completed`;
    todoCompleted.checked = completed;
    const completedLabel = document.createElement("label");
    completedLabel.innerText = "Completed";
    completedLabel.htmlFor = `${title.replaceAll(' ', '-')}-completed`;
    const completedWrapper = document.createElement("div");
    completedWrapper.classList.add("completed-wrapper");
    completedWrapper.append(completedLabel, todoCompleted);

    const dateAndCompletedWrapper = document.createElement("div");
    dateAndCompletedWrapper.classList.add("dateAndPriority");
    dateAndCompletedWrapper.append(cardDate, completedWrapper);

    card.appendChild(dateAndCompletedWrapper);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-button';
    delBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    card.appendChild(delBtn);

    return card;
}