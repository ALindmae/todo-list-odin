import "./styles.css"

import { loadDB } from './data.js';
import { renderAllProjects } from './render.js';
import { enableClickHandlers } from './render.js';
import { enableHoverHandlers } from "./render.js";

const db = loadDB();
enableClickHandlers();
enableHoverHandlers();
renderAllProjects(db);