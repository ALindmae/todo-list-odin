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

localStorage.setItem("projects", JSON.stringify(projects));

// Default Project class
class Project {
  constructor({title, id, type}) {
    this.title = title;
    this.id = id;
    this.type = type;
  }
/*   id = crypto.randomUUID(); */
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
    constructor ({title}) {
        this.title = title || null;
    }
    state = "unchecked";
    labels = [
        { type: "priority", value: null },
        { type: "dueDate", value: null }
    ];
    description = null;
}

class Task {
    constructor ({title}) {
        this.title = title || null;
    }
    id = crypto.randomUUID();
    labels = [
        { type: "priority", value: null },
        { type: "dueDate", value: null }
    ];
    description = null;
    blocks = [];
}

// Create new block based on what block user chose in the UI
export function createItem({type, title, id, state, priority}) {
    switch (type) {

    case "project" :
    return new Project({title, id, type});
    break;

    case "checkBox" :
    return newBlock.setType(CheckBox, {
        title,
        state,
        priority,
        id,
    });
    break;

    case "task" :
        const newBlock = new Block({title, id, type});
    newBlock.setType(Task, {
        title,
        priority,
        id,
    });
    console.log(newBlock);
    return newBlock;
    break;

    case "textBlock" :
    return newBlock.setType(TextBlock, {
        title,
        id,
    });
    break;

        case "heading" :
    return newBlock.setType(Heading, {
        title,
        state,
        priority,
        id,
    });
    break;
    };
}

// C - Save item into database
export function saveItem({ type, data, projectId, taskId}) {
    const projectsDB = JSON.parse(localStorage.getItem('projects'));
    console.log(projectsDB, data, projectId);

    if (projectsDB) {    
        switch (type) {
            case "project" :
                insertProject({
                    projectsDB,
                    data,
                });
                break;

            case "block" :
                insertBlock({
                    projectsDB,
                    data,
                    projectId,
                    taskId,
                });
                break;

            case "task" :
                insertTask({
                    projectsDB,
                    data,
                    projectId,
                });
                break;
            
            default:
                console.log(`Unknown type: ${type}`);
        }
    }
    else {
        return console.log("Not possible to retrieve projects from the database")
    }

    localStorage.setItem('projects', JSON.stringify(projectsDB));
}

// Database object insertion functions
function insertBlock({ projectsDB, data, projectId, taskId }) {
        if (projects) {
        const targetProject = projectsDB.find(proj => proj.id == projectId)
        const targetTask = targetProject.tasks.find(task => task.id == taskId)
        targetTask.blocks.push(data);
    }
    else {
        console.log("No projects retrieced from the database")
        return;
    }
    
}

function insertTask({ projectsDB, data, projectId }) {
    if (projectsDB) {
        const targetProject = projectsDB.find(proj => proj.id == projectId)
        targetProject.tasks.push(data);
    }
    else {
        console.log("No projects retrieved from the database")
        return;
    }

}

function insertProject({ projectsDB, data }) {
        projectsDB.push(data);
}

export function loadDB() {
    return JSON.parse(localStorage.getItem('projects'));
}

// To do: delete item
// To do: update item