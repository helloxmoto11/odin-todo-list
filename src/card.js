export default function Card(title, description, date, priority, completed) {
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
    todoCompleted.checked = completed;

    const dateAndPriorityWrapper = document.createElement("div");
    dateAndPriorityWrapper.classList.add("dateAndPriority");
    dateAndPriorityWrapper.append(cardDate, cardPriority);

    card.appendChild(dateAndPriorityWrapper);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);

    return card;
}