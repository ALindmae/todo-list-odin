// Database structure template to save into localstorage - mock data

let projects = [{
    title: "studies",
    id: crypto.randomUUID(),
    description: "lots of studying related tasks",
    tasks: [{
        title: "get study books",
        id: crypto.randomUUID(),
        labels: {
            priority: ""/* low, high, medium */,
            dueDate: ""/* DD,MM,YY */,
        },
        description: "text",
        blocks: [
            {
                // checkBox
                id: crypto.randomUUID(),
                type: "checkBox",
                title: "checkBoxelement",
                state: "unchecked",
                labels: {
                    priority: ""/* low, high, medium */,
                    dueDate: ""/* DD,MM,YY */,
                },
                description: "text"
            },
            {
                id: crypto.randomUUID(),
                type: "lineBreak",
            },
            {
                id: crypto.randomUUID(),
                type: "heading",
                title: "Myfirstheading",
            },
            {
                id: crypto.randomUUID(),
                type: "task",
                title: "Myfirstheading",
            },
            
            ]
    },
{
        title: "and study hard",
        id: crypto.randomUUID(),
        labels: {
            priority: ""/* low, high, medium */,
            dueDate: ""/* DD,MM,YY */,
        },
        description: "text",
        blocks: [
            {
                // checkBox
                id: "",
                type: "checkBox",
                title: "checkBoxeleent",
                state: "checked",
                labels: {
                    priority: ""/* low, high, medium */,
                    dueDate: ""/* DD,MM,YY */,
                },
                description: "text"
            },
            {
                id: "",
                type: "lineBreak",
            },
            {
                id: "",
                type: "heading",
                title: "Myfirstheading",
            },
            ]
    },]
},
{
    title: "works",
    id: crypto.randomUUID(),
    description: "",
    tasks: [{
        title: "get study books",
        id: crypto.randomUUID(),
        labels: {
            priority: ""/* low, high, medium */,
            dueDate: ""/* DD,MM,YY */,
        },
        blocks: [
            {
                // checkBox
                id: "",
                type: "checkBox",
                title: "",
                state: "checked",
                labels: {
                    priority: ""/* low, high, medium */,
                    dueDate: ""/* DD,MM,YY */,
                },
                description: "text"
            },
            {
                id: "",
                type: "lineBreak",
            },
            {
                id: "",
                type: "heading",
                title: "",
            },
            ]
    }]
},
];

saveToStorage(projects);

function saveToStorage(projectsDB) {
    localStorage.setItem("projects", JSON.stringify(projectsDB));
};

// Default Project class
class Project {
  constructor({title, id, type}) {
    this.title = title;
    this.id = id;
    this.type = type;
  }
  tasks = [];
}

// Default block class
class Block {
    constructor ({type, title, id}) {
        this.type = type,
        this.title = title;
        this.id = id;
    }

    setType(BlockType, options) {
        Object.assign(this, new BlockType(options));
        return this;
    }
}

// Specific block type classes
class CheckBox {
    state = "unchecked";
    constructor ({priority, dueDate} = {}) {
        this.labels = [
            { type: "priority", value: priority || null},
            { type: "dueDate", value: dueDate || null }
        ];
    };
    description = null;
}

class Task {
    constructor ({priority, dueDate} = {}) {
        this.labels = [
            { type: "priority", value: priority || null},
            { type: "dueDate", value: dueDate || null }
        ];
    };
    description = null;
    blocks = [];
}

/* class Task {
    labels = [
        { type: "priority", value: null },
        { type: "dueDate", value: null }
    ];
    description = null;
    blocks = [];
} */

// Create new block based on what block user chose in the UI
export function createItem({type, title, id, state, priority, dueDate}) {

    if (!type) {
        throw new Error("Type is required to create item");
    }

    switch (type) {
        case "project" :
            return new Project({title, id, type});

        case "checkBox" :
        return new Block({title, id, type}).setType(CheckBox, {priority, dueDate});

        case "task" :
            return new Block({title, id, type}).setType(Task, {priority, dueDate});

/*         const newBlock = new Block({title, id, type});
        newBlock.setType(Task, {
            priority,
        });
        return newBlock; */


        case "textBlock" :
            return new Block({title, id, type});

        case "heading" :
            return new Block({title, id, type}).setType(Task, {priority, dueDate});
    };
}

// C - Save item into database
export function saveItem({ type, data, projectId, taskId}) {
    const projectsDB = JSON.parse(localStorage.getItem('projects'));

    if (!projectsDB) {
        console.log("Not possible to retrieve projects from the database");
        return false;
    }

    let insertSuccess = false;

    switch (type) {
        case "project" :
            insertSuccess = insertProject({ projectsDB, data });
            break;

        case "block" :
            insertSuccess = insertBlock({
                projectsDB,
                data,
                projectId,
                taskId,
            });
            break;

        case "task" :
            insertSuccess = insertTask({
                projectsDB,
                data,
                projectId,
            });
            break;
        
        default:
            console.log(`Unknown type: ${type}`);
            return false;
    }

    if (!insertSuccess) {
    console.log("Insertion failed");
    return false;
    }

    try {
        saveToStorage(projectsDB);
        console.log("Saved successfully");
        return true;
    }
    catch (err) {
        console.error("Save failed:", err);
    }
}

// Database object insertion functions
function insertBlock({ projectsDB, data, projectId, taskId }) {
        if (!projectsDB) return false;

        const targetProject = projectsDB.find(proj => proj.id == projectId);
        if (!targetProject) return false;

        const targetTask = targetProject.tasks.find(task => task.id == taskId)
        if (!targetTask) return false;

        targetTask.blocks.push(data);
        return true;
}

function insertTask({ projectsDB, data, projectId }) {
    if (!projectsDB) return false;

    const targetProject = projectsDB.find(proj => proj.id == projectId);
    if (!targetProject) return false;

    targetProject.tasks.push(data);
    return true;
}

function insertProject({ projectsDB, data }) {
    if (!projectsDB) return false;
    
    projectsDB.push(data);
    return true;
}

export function loadDB() {
    return JSON.parse(localStorage.getItem('projects'));
}

// To do: delete item
// To do: update item