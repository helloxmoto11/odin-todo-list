export default function Nav(categories, selectedCategory, onSelectCategory, onAddCategory, onDeleteCategory) {
    const nav = document.querySelector("nav");
    nav.replaceChildren()
    const title = document.createElement("h1");
    title.innerText = "Odin Todo List";

    nav.appendChild(title);

    const navInner = document.createElement("div");
    navInner.classList.add("nav-inner");
    const categoriesTitle = document.createElement("h3");
    categoriesTitle.innerText = "Categories";
    navInner.appendChild(categoriesTitle);


    categories.forEach((category) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("proj-wrapper");
        const pCategory = document.createElement("p");
        pCategory.innerText = category.name;
        if (category.name === selectedCategory) {
            wrapper.classList.add("selected-proj-wrapper");
        }

        wrapper.addEventListener("click", () => {
            onSelectCategory(category.name)
        })
        wrapper.appendChild(pCategory);
        const deleteCategoryButton = document.createElement("button");
        deleteCategoryButton.classList.add("btn-delete-category");
        deleteCategoryButton.addEventListener("click", (e) => {
            e.stopPropagation();
            onDeleteCategory(category.id);
        });
        deleteCategoryButton.innerHTML = `<span class="material-symbols-outlined close-icon">close</span>`;
        wrapper.appendChild(deleteCategoryButton);
        navInner.appendChild(wrapper);
    })

    const addNewCategoryButton = document.createElement("button");
    addNewCategoryButton.innerText = "Add New Category";
    addNewCategoryButton.classList.add("add-new-proj-btn");
    addNewCategoryButton.addEventListener("click", () => {
        if (addNewCategoryButton.innerText === "Add New Category") {
            showAddCategoryForm(navInner, addNewCategoryButton, onAddCategory, onSelectCategory);
            addNewCategoryButton.innerText = "Cancel";
            addNewCategoryButton.classList.toggle("cancel");
        } else if (addNewCategoryButton.innerText === "Cancel") {
            const addProjForm = document.getElementById("add-project-form");
            navInner.removeChild(addProjForm);
            addNewCategoryButton.innerText = "Add New Category";
        }
    })
    navInner.appendChild(addNewCategoryButton);
    nav.append(navInner);
}

function showAddCategoryForm(nav, addNewCategoryButton, onAddCategory, onSelectCategory) {
    nav.insertBefore(AddCategoryForm(onAddCategory, onSelectCategory), addNewCategoryButton);
}

function AddCategoryForm(onAddCategory, onSelectCategory) {
    const container = document.createElement("div");
    container.id = "add-project-form"
    container.classList.add("add-proj-form");
    const input = document.createElement("input");
    input.id = "add-proj";
    input.placeholder = "Project Name"


    const okButton = document.createElement("button");
    okButton.innerText = "OK"
    okButton.classList.add("ok-button");
    okButton.addEventListener("click", () => {
        const newCategoryName = input.value;
        onAddCategory(newCategoryName);
        onSelectCategory(newCategoryName);
    })

    container.append(input, okButton);

    return container;
}
