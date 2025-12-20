import "./styles.css"

import { loadDB } from './data.js';
import { renderAllProjects } from './render.js';

const db = loadDB();
renderAllProjects(db);