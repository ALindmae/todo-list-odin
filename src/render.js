/* UI RESOURCES & CONFIGURATION */

export const UI_STATE = {
    scope: "",
}

const projectIcon = {
    tagName: "span",
    class: "material-symbols-outlined",
    textContent: "rocket_launch",
}

const blockHoverIcons = {
    tagName: "span",
    class: "material-symbols-outlined",
    textContent: "more_vert",  
}

const progressIcon = {
    none : `
        <svg class="progressIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Percentage-0--Streamline-Tabler" height="24" width="24">
            <desc>
                Percentage 0 Streamline Icon: https://streamlinehq.com
            </desc>
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0 -18 0" stroke-width="2"></path>
        </svg>`,

    quarter : `
    <svg class="progressIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Percentage-25--Streamline-Tabler" height="24" width="24">
        <desc>
            Percentage 25 Streamline Icon: https://streamlinehq.com
        </desc>
        <path d="M21 12a9 9 0 0 0 -9 -9m0 0v9h9" fill="#000000" stroke="none" stroke-width="2"></path>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0 -18 0" stroke-width="2"></path>
    </svg>`,

    half : `
    <svg class="progressIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Percentage-50--Streamline-Tabler" height="24" width="24">
        <desc>
            Percentage 50 Streamline Icon: https://streamlinehq.com
        </desc>
        <path d="M12 21a9 9 0 0 0 0 -18m0 0v18" fill="#000000" stroke="none" stroke-width="2"></path>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0 -18 0" stroke-width="2"></path>
    </svg>`,

    threeQuarters : `
    <svg class="progressIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Percentage-75--Streamline-Tabler" height="24" width="24">
        <desc>
            Percentage 75 Streamline Icon: https://streamlinehq.com
        </desc>
        <path d="M3 12a9 9 0 1 0 9 -9m0 0v9H3" fill="#000000" stroke="none" stroke-width="2"></path>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0 -18 0" stroke-width="2"></path>
    </svg>`,

    complete : `
    <svg class="progressIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Percentage-100--Streamline-Tabler" height="24" width="24">
        <desc>
            Percentage 100 Streamline Icon: https://streamlinehq.com
        </desc>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0 -18 0" fill="#000000" stroke-width="2"></path>
    </svg>`,
}

const addItemMenuItems = [
    {
        itemType: "checkBox",
        text: "Add CheckBox",
        icon: "",
        scope: ['task'],
    },
    {
        itemType: "text",
        text: "Add Text",
        icon: "",
        scope: ['task'],
    },
    {
        itemType: "heading",
        text: "Add Heading",
        icon: "",
        scope: ['task'],
    },
    {
        itemType: "task",
        text: "Add Task",
        icon: "",
        scope: ['all-projects', 'my-projects', 'project', 'task'],
    },
    {
        itemType: "project",
        text: "Add Project",
        icon: projectIcon,
        scope: ['all-projects', 'my-projects', 'project', 'task'],
    }
];

const EDIT_MENU_ITEMS = [
    {
        text: "Edit title",
    }
]


/* RENDER ENTRY POINTS */

export function renderAllProjects(db) {

    UI_STATE.scope = "all-projects";

    const app = document.querySelector('#app');
    app.textContent = "";

    const content = document.createElement('div');
    content.classList.add('main-content');

    const title = document.createElement('h1');
    title.textContent = "All projects";

    app.appendChild(title);
    
    db.forEach(project => {
        const projectElement = createProjectElement(project);

        project.tasks.forEach(task => {
            projectElement.append(createTaskElement(task));
        });

        
        app.append(projectElement);
    });

    renderAddItemsButton(db);
}


/* DOM FACTORIES / COMPONENT BUILDERS */

function createHoverIcon(icon) {
    const iconElement = document.createElement(icon.tagName);
    iconElement.classList.add(icon.class);
    iconElement.classList.add('hover-menu__icon');
    iconElement.textContent = icon.textContent;
    return iconElement;
}

function createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.setAttribute('data-id', project.id);
    projectElement.classList.add('block', 'project');

    const hoverIcon = createHoverIcon(blockHoverIcons);

    const icon = document.createElement(projectIcon.tagName);
    icon.classList.add(projectIcon.class);
    icon.classList.add('project__icon');
    icon.textContent = projectIcon.textContent;

    const title = document.createElement('h2');
    title.classList.add('project__title');
    title.textContent = project.title;

    projectElement.append(hoverIcon, icon, title);

    if (project.description) {
        const description = document.createElement('p');
        description.classList.add('project__description');
        description.textContent = project.description;
        projectElement.append(description);
    }
    
    return projectElement;
}

function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.setAttribute('data-id', task.id);
    taskElement.classList.add('block', 'task');

    const hoverIcon = createHoverIcon(blockHoverIcons);

    const key = calculateProgress(task);
    const icon = progressIcon[`${key}`];

    const title = document.createElement('p');
    title.classList.add('task__title');
    title.textContent = task.title;

    taskElement.append(hoverIcon);
    taskElement.insertAdjacentHTML('beforeend', icon);
    taskElement.append(title);
    
    return taskElement;
}

function renderAddItemsButton(db) {
    const app = document.querySelector('#app');

    const wrapper = document.createElement('div');
    wrapper.classList.add('add-items');

    const button = document.createElement('button');
    button.textContent = "+";
    button.classList.add('button', 'add-items__button');
    button.dataset.toggle = "add-items-menu";

    const menu = createAddItemMenu(db);

    wrapper.append(button, menu);

    app.appendChild(wrapper);
}

function createAddItemMenu(db) {
    const menu = document.createElement('div');
    menu.classList.add('add-items__menu');
    menu.dataset.menu = "add-items-menu";

    addItemMenuItems.forEach( item => {
        if (item.scope.includes(UI_STATE.scope))
        menu.append(createAddItemMenuItemElement(item));
    })

    menu.append(createProjectSelectionMenu(db));

    return menu;
}

function createAddItemMenuItemElement(item) {
    const itemElement = document.createElement('button');
    itemElement.classList.add('add-items__menu-item', 'menu-item');
    itemElement.dataset.itemType = item.itemType;
    
    let icon;
    if (item.icon) {
        icon = document.createElement(item.icon.tagName);
        icon.classList.add(item.icon.class);
        icon.textContent = item.icon.textContent;
    }
    else {
        icon = document.createElement('p');
    }

    const text = document.createElement('p');
    text.textContent = item.text;

    itemElement.append(icon, text);

    return itemElement;
}

function createProjectSelectionMenu(db) {
    const menu = document.createElement('div');
    menu.classList.add('selection-panel', 'selection-panel--project-selection');

    const title = document.createElement('p');
    title.textContent = "Select project:";

    const itemsWrapper = document.createElement('div');
    itemsWrapper.classList.add('selection-panel__items-wrapper');

    db.forEach(project => {
        const projectTitle = project.title;
        const projectId = project.id;
        itemsWrapper.appendChild(createProjectSelectionMenuItem({projectTitle, projectId}));
    
    });

    menu.append(title, itemsWrapper);
    return menu;
}

function createProjectSelectionMenuItem({projectTitle, projectId}) {
    const item = document.createElement('button');
    item.classList.add('selection-panel__item');
    item.setAttribute('data-project-id', projectId);

    const icon = document.createElement(projectIcon.tagName);
    icon.classList.add(projectIcon.class);
    icon.classList.add('selection-panel__item__icon');
    icon.textContent = projectIcon.textContent;

    const title = document.createElement('p');
    title.classList.add('selection-panel__item__title');
    title.textContent = projectTitle;

    item.append(icon, title);

    return item;
}


/* UI STATE & DERIVED DATA */

function countCheckboxes(blocks) {
    let checked = 0;
    let total = 0;

    blocks.forEach(block => {
        if (block.type === 'checkBox') {
            total++;
            if (block.state === 'checked') {
                checked++;
            }
        } 
        else if (block.type === 'task' && Array.isArray(block.blocks)) {
            const result = countCheckboxes(block.blocks);
            checked += result.checked;
            total += result.total;
        }
    });

    return { checked, total };
}

function calculateProgress(task) {
    const { checked, total } = countCheckboxes(task.blocks);

    if (total === 0) return 'none';

    const percentage = (checked / total) * 100;

    if (percentage === 100) return 'complete';
    if (percentage > 50) return 'threeQuarters';
    if (percentage > 25) return 'half';
    if (percentage > 0) return 'quarter';

    return 'none';
}

// Render under specific project: query by id, appendchil.

// pas projectID as argument
// under case "task": if projectID passed, query the project node + append, else append to app

/* getProjectNode(projectId) {
    return document.querySelector()
}  */

export function renderMainPanelItemForm({ id, type, projectId }) {
    const form = createMainPanelItemForm({ id, type, projectId });
    if (!form) return;

    const app = document.querySelector('#app')
    if (projectId) {
        const projectNode = app.querySelector(`[data-id="${projectId}"]`);
        projectNode.appendChild(form);
        return form;
    } else {
       app.appendChild(form);
       return form;
    }
}

function createMainPanelItemForm({id, type, projectId}) {
    switch (type) {
        case "project" :
            return createMainPanelProjectFormElement({id, type});
        
        case "block" :
            return createMainPanelBlockFormElement({id, type});
        
        case "task" :
            return createMainPanelTaskFormElement({id, type, projectId});
        
        default:
            console.log(`Unknown type passed to the renderMainPanelItemForm(): ${type}`);
    }
}

function createMainPanelProjectFormElement({id, type}) {
    const projectForm = document.createElement('div');
    projectForm.classList.add('main-panel-form', 'project-form');
    projectForm.dataset.id = id;
    projectForm.dataset.type = type

    const icon = document.createElement(projectIcon.tagName);
    icon.classList.add(projectIcon.class);
    icon.classList.add('project__icon');
    icon.textContent = projectIcon.textContent;

    const titleInput = document.createElement('input');
    titleInput.name = "title";
    titleInput.type = 'text';
    titleInput.dataset.input = "title";
    titleInput.classList.add('main-panel-form__input', 'project-title');

    projectForm.append(icon, titleInput);

    return projectForm;
}


function createMainPanelBlockFormElement({id, type}) {
    const blockForm = document.createElement('div');
    blockForm.classList.add('main-panel-form', 'block-form');
    blockForm.dataset.id = id;
    blockForm.dataset.type = type

    const titleInput = document.createElement('input');
    titleInput.name = "title";
    titleInput.type = 'text';
    titleInput.dataset.input = "title";
    titleInput.classList.add('main-panel-form__input', 'block-title');

    blockForm.append(titleInput);

    return blockForm;
}

function createMainPanelTaskFormElement({id, type, projectId}) {
    const taskForm = document.createElement('div');
    taskForm.classList.add('main-panel-form', 'task-form');
    taskForm.dataset.id = id;
    taskForm.dataset.type = type;
    taskForm.dataset.projectId = projectId;

    const icon = progressIcon.none;

    const titleInput = document.createElement('input');
    titleInput.name = "title";
    titleInput.type = 'text';
    titleInput.dataset.input = "title";
    titleInput.classList.add('main-panel-form__input', 'task-title');

    taskForm.innerHTML = icon;
    taskForm.append(titleInput);

    return taskForm;
}


