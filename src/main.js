import "./styles.css"

import { loadDB } from './data.js';
import { renderAllProjects } from './render.js';
import { enableClickHandlers } from './events.js';
import { enableHoverHandlers } from "./events.js";
import { enableBlockSave  } from "./events.js";

const db = loadDB();
enableClickHandlers();
enableHoverHandlers();
enableBlockSave();
renderAllProjects(db);