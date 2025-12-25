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
    enableHoverMenu();

}

function createHoverIcon(icon) {
    const iconElement = document.createElement(icon.tagName);
    iconElement.classList.add(icon.class);
    iconElement.classList.add('hover-menu__icon');
    iconElement.textContent = icon.textContent;
    return iconElement;
}

function toggleHoverIcon(selector) {
    const icon = selector.querySelector('.hover-menu__icon');
    icon.classList.add('active');
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

function addGlobalEventListener(type, selector, callback) {
    document.body.addEventListener(type, (e) => {
        const target = e.target.closest(selector);
        if (!target) return;

        callback(e, target);
    })
};

function enableHoverMenu () {
    addGlobalEventListener('mouseover', '.block', (e, block) => {
    const icon = block.querySelector('.hover-menu__icon');
    console.log(icon);
    icon.classList.toggle('active', 1 === 1);
    })

    addGlobalEventListener('mouseout', '.block', (e, block) => {
    const icon = block.querySelector('.hover-menu__icon');
    icon.classList.toggle('active');
    })
};






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