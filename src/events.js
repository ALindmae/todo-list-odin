import { loadDB } from './data.js';
import { renderAllProjects } from './render.js';
import { saveItem } from './data.js';
import { renderMainPanelItemForm } from './render.js';
import { UI_STATE } from './render.js';
import { createItem } from './data.js';

/* EVENT REGISTRATION */

export function enableClickHandlers () {
    document.addEventListener('click', (e) => {
        onAddItemsButtonClick(e);
        onAddItemsMenuClick(e);
    }) 
}

export function enableHoverHandlers () {
    document.addEventListener('mouseover', handleHoverIn)
    document.addEventListener('mouseout', handleHoverOut)
}


/* FEATURE REGISTRATION */
export function enableBlockSave () {
    let saveReady = true;
    document.addEventListener('pointerdown', verifyBlockSave);
    document.addEventListener('focusout', handleBlockSave);

    function verifyBlockSave(e) {
    const blockPointer = e.target.closest('.main-panel-form');
    if (blockPointer) {
        saveReady = false;
    }
    else saveReady = true;
    }

    function handleBlockSave(e) {
    const focusOutBlock = e.target.closest('.main-panel-form');
    let focusOnBlock;
    if (e.relatedTarget) focusOnBlock = e.relatedTarget.closest('.main-panel-form');
    if (focusOutBlock) {
        if (!focusOnBlock) {
            if (saveReady) {
                const itemInput = getFormData(focusOutBlock);
                const item = createItem(itemInput);

                saveItem({type: item.type, data: item});
                renderAllProjects(loadDB());
            }
        }
    }
    saveReady = true;
    }
}

function getFormData(form) {
    let title = form.querySelector('[data-input="title"]').value;
    let id = form.dataset.id;
    let type = form.dataset.type;

    return { title, id, type }
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

function onAddItemsButtonClick(e) {
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

function onAddItemsMenuClick(e) {
    const item = e.target.closest('.add-items__menu-item');

    if (!item) {
        if (e.target.closest(('.add-items__menu.active'))) {
            closeActive(".add-items__menu");
        }
        return;
    }

    const itemType = item.dataset.itemType;

    const itemId = crypto.randomUUID();

    renderMainPanelItemForm({id: itemId, type: itemType});

    closeActive(".add-items__menu");
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