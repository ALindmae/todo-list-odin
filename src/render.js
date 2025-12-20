/* -- resources -- */

const ADDBLOCK_MENU_ITEMS = {
    checkBox: {
        "item-type": "checkBox",
        text: "Add CheckBox",
        icon: ""
    },
    text: {
        "item-type": "text",
        text: "Add Text",
        icon: ""
    },
    heading: {
        "item-type": "heading",
        text: "Add Headingx",
        icon: ""
    },
    task: {
        "item-type": "task",
        text: "Add Task",
        icon: ""
    },
};

const projectIcon = {
    tagName: "span",
    class: "material-symbols-outlined",
    textContent: "rocket_launch",
}

export function renderAllProjects(db) {
    const body = document.querySelector('body');
    body.textContent = "";

    const title = document.createElement('h1');
    title.textContent = "All projects";

    body.appendChild(title);
    
    db.forEach(project => {
        const projectElement = createProjectElement(project);

        project.tasks.forEach(task => {
            projectElement.append(createTaskElement(task));
        });

        
        body.append(projectElement);
    });

}

function createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.setAttribute('data-id', project.id);
    projectElement.classList.add('block', 'project-block');

    const icon = document.createElement(projectIcon.tagName);
    icon.classList.add(projectIcon.class);
    icon.classList.add('project-icon');
    icon.textContent = projectIcon.textContent;

    const title = document.createElement('h2');
    title.classList.add('project-title');
    title.textContent = project.title;

    projectElement.append(icon, title);

    if (project.description) {
        const description = document.createElement('p');
        description.classList.add('project-description');
        description.textContent = project.description;
        projectElement.append(description);
    }
    
    return projectElement;
}

function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.setAttribute('data-id', task.id);
    taskElement.classList.add('block', 'task-block');

    const title = document.createElement('p');
    title.classList.add('task-title');
    title.textContent = task.title;

    taskElement.append(title);
    
    return taskElement;
}





/* function renderMenu(menuitems) {
    const body = document.querySelector('body');
    
    const div = document.createElement('div');
    for (const item of Object.values(menuitems)) {
        const button = document.createElement('button');
        button.setAttribute("data-item-type", item["item-type"]);
        button.textContent = item.text;
        div.appendChild(button);
    }
    body.appendChild(div);
} */