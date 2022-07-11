import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Todo } from '../types/todo';

@Component( {
    selector: 'projects-todo-interactive',
    templateUrl: './todo-interactive.component.html',
    styleUrls: ['./todo-interactive.component.scss'],
} )
export class TodoInteractiveComponent implements OnInit {
    @Input() todo!: Todo;
    @Input() project_id!: number;

    constructor (
        private projects_service: ProjectsService,
    ) { }

    ngOnInit (): void {

    }

    update_value ( new_value: boolean ) {
        console.log( this.todo.id, this.project_id, this.todo.isCompleted, new_value );
        this.projects_service.update_todo_value( this.project_id, this.todo.id, new_value ).catch( () => {
            console.log( 'reset is needed' );
            this.todo.isCompleted = !new_value;
        } );
    }
}
