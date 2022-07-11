import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window/window.component';
import { ProjectsCollectionComponent } from './projects-collection/projects-collection.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TodoInteractiveComponent } from './todo-interactive/todo-interactive.component';
import { ModalCreateTodoComponent } from './modal-create-todo/modal-create-todo.component';
import { ModalCreateProjectComponent } from './modal-create-project/modal-create-project.component';


@NgModule( {
    declarations: [
        WindowComponent,
        ProjectsCollectionComponent,
        ProjectCardComponent,
        TodoInteractiveComponent,
        ModalCreateTodoComponent,
        ModalCreateProjectComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        WindowComponent,
    ],
} )
export class ProjectsModule { }
