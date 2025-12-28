/* UI RESOURCES & CONFIGURATION */

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
        scope: ['Task'],
    },
    {
        itemType: "text",
        text: "Add Text",
        icon: "",
        scope: ['Task'],
    },
    {
        itemType: "heading",
        text: "Add Heading",
        icon: "",
        scope: ['Task'],
    },
    {
        itemType: "task",
        text: "Add Task",
        icon: "",
        scope: ['All Projects', 'My Projects', 'Project', 'Task'],
    },
    {
        itemType: "project",
        text: "Add Project",
        icon: projectIcon,
        scope: ['All Projects', 'My Projects', 'Project', 'Task'],
    }
];

const EDIT_MENU_ITEMS = [
    {
        text: "Edit title",

    }
]


/* RENDER ENTRY POINTS */

export function renderAllProjects(db) {
    let scope = "All Projects";

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

    renderAddItemsButton(scope);
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

function renderAddItemsButton(scope) {
    const body = document.querySelector('body');

    const wrapper = document.createElement('div');
    wrapper.classList.add('add-items');

    const button = document.createElement('button');
    button.textContent = "+";
    button.classList.add('button', 'add-items__button');
    button.dataset.toggle = "add-items-menu";

    const menu = createAddItemMenu(scope);

    wrapper.append(button, menu);

    body.appendChild(wrapper);
}

function createAddItemMenu(scope) {
    const menu = document.createElement('div');
    menu.classList.add('add-items__menu');
    menu.dataset.menu = "add-items-menu";

    addItemMenuItems.forEach( item => {
        if (item.scope.includes(scope))
        menu.append(createAddItemMenuItemElement(item));
    })

    return menu;
}

function createAddItemMenuItemElement (item) {
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


/* EVENT REGISTRATION */

export function enableClickHandlers () {
    document.addEventListener('click', (e) => {
        onAddItemsButtonClick(e);
    }) 
}


export function enableHoverHandlers () {
    document.addEventListener('mouseover', handleHoverIn)
    document.addEventListener('mouseout', handleHoverOut)
}


/* EVENT HANDLERS */

function handleHoverIn(e) {
    onBlockHoverMenuHover(e);
}

function handleHoverOut(e) {
    onBlockHoverMenuHoverOut(e);
}

function onBlockHoverMenuHover (e) {
    const block = e.target.closest('.block');
    if (!block) return;

    const icon = block.querySelector('.hover-menu__icon');
    icon.classList.toggle('active');
}

function onBlockHoverMenuHoverOut(e) {
    const block = e.target.closest('.block');
    if (!block) return;

    const icon = block.querySelector('.hover-menu__icon');
    icon.classList.toggle('active');
}

function onAddItemsButtonClick (e) {
    const button = e.target.closest('[data-toggle]');
    const wrapper = e.target.closest('.add-items');

    if (!button) {
        if (!e.target.closest(('.add-items__menu.active'))) {
            closeActive(".add-items__menu");
        }
        return;
    }

    const menu = wrapper.querySelector(`[data-menu]`);
    menu.classList.toggle('active');
}


/* UI BEHAVIOR HELPERS */

function closeActive(selector, except) {
  document.querySelectorAll(selector).forEach(element => {
    if (element !== except) {
      element.classList.remove('active');
    }
  });
}






// Hover menu functionality
// On click -> Render menu box :
                // - Edit title
                // - Edit property (if exists).  : Separate object for conditional items / condition as a property
                // - Delete
                // - Transform into > other block


// - Edit property (if exists).  : condition as a property
// Take hover menu parentnode data-id
// 




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