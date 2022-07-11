import { Project } from './project';
import { Todo } from './todo';

export interface ProjectsCollectionElement extends Omit<Project, 'todos'> {
    todos: {
        [key: number]: Todo
    }
}

export interface ProjectsCollection {
    [key: number]: ProjectsCollectionElement
}
