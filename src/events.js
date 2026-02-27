import { loadDB } from './data.js';
import { renderAllProjects } from './render.js';
import { saveItem } from './data.js';
import { renderMainPanelItemForm } from './render.js';
import { UI_STATE } from './render.js';
import { createItem } from './data.js';

let addItemState = {
    itemType: null,
};


/* EVENT REGISTRATION */

export function enableClickHandlers () {
    document.addEventListener('click', (e) => {
        onAddItemsMenuClick(e);
    }) 
}

export function enableHoverHandlers () {
    document.addEventListener('mouseover', handleHoverIn)
    document.addEventListener('mouseout', handleHoverOut)
}


/* FEATURE REGISTRATION */
export function enableBlockSave () {
    /* let saveReady = true; */
    let pointerInsideBlock = null;

    document.addEventListener('pointerdown', (e) => {
        pointerInsideBlock = e.target.closest('.main-panel-form');
    });
    document.addEventListener('focusout', handleFocusOut);
    /* document.addEventListener('keydown', handleKeyDown); */

/*     function checkBlockPointer(e) {
    return e.target.closest('.main-panel-form');
    if (blockPointer) {
        saveReady = false;
    }
    else saveReady = true;
    } */

/*     function handleKeyDown(e) {
            if (e.target.closest('.main-panel-form') === document.activeElement.closest('.main-panel-form'));
    console.log(e.target.closest('.main-panel-form'));
    if (e.type === 'keydown') {
        console.log(document.activeElement);
        if (e.key === 'Enter' && !e.shiftKey) 
        console.log(e.key);
    }
        
    } */

    function handleFocusOut(e) {
        const focusOutBlock = e.target.closest('.main-panel-form');
        if (!focusOutBlock) return;

        if (e.relatedTarget) {
            let focusOnBlock;
            focusOnBlock = e.relatedTarget.closest('.main-panel-form');
            if (focusOnBlock === focusOutBlock) return;
        }
  
        if (pointerInsideBlock === focusOutBlock) return;

        if (attemptSave(focusOutBlock)) {
            renderAllProjects(loadDB());
        }

        pointerInsideBlock = null;
    }
}

function attemptSave(focusOutBlock) {
    const itemInput = getFormData(focusOutBlock);
    if (!itemInput.title) return null;

    const projectId = itemInput.projectId;
    const item = createItem(itemInput);

    return saveItem({type: item.type, data: item, projectId});
}


function getFormData(form) {
    let title = form.querySelector('[data-input="title"]').value;
    let id = form.dataset.id;
    let projectId = form.dataset.projectId;
    let type = form.dataset.type;

    return { title, id, type, projectId }
}


/* EVENT HANDLERS */

function handleHoverIn(e) {
    onBlockHoverMenuHover(e);
}

function handleHoverOut(e) {
    onBlockHoverMenuHoverOut(e);
}

function onBlockHoverMenuHover(e) {
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

function onAddItemsMenuClick(e) {
    const addItemsButton = e.target.closest('[data-toggle]');
    const addItemsMenuWrapper = e.target.closest('.add-items');
    const item = e.target.closest('.add-items__menu-item');
    const projectSelection = e.target.closest('.selection-panel--project-selection');


    if (addItemsButton && addItemsMenuWrapper) {
        const addItemsMenu = addItemsMenuWrapper.querySelector(`[data-menu]`)
        addItemsMenu.classList.toggle('active')
        return;
    }
    
    if (item) {
        addItemState.itemType = item.dataset.itemType;

        if (UI_STATE.scope === 'all-projects' && addItemState.itemType !== "project") {
            const projectSelectionGlobal = document.querySelector('.selection-panel--project-selection');
            projectSelectionGlobal.classList.toggle('active');
            return;
        }

        else {
            const itemId = crypto.randomUUID();
            renderMainPanelItemForm({id: itemId, type: addItemState.itemType});
            closeActive([".add-items__menu", ".selection-panel--project-selection"]);
            addItemState.itemType = null;
            return;
        }
    }

    if (projectSelection && addItemState.itemType) 
    {
        const project = e.target.closest('.selection-panel__item');
        if (!project) {
            return
        }
        const projectId = project.dataset.projectId;
        const itemId = crypto.randomUUID();
        renderMainPanelItemForm({id: itemId, type: addItemState.itemType, projectId});
        closeActive([".add-items__menu", ".selection-panel--project-selection"]);
        addItemState.itemType = null;
        return;
    }

    closeActive([".add-items__menu", ".selection-panel--project-selection"]);
    addItemState.itemType = null;
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