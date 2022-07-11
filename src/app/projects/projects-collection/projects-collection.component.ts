import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../types/project';
import { ProjectsCollection, ProjectsCollectionElement } from '../types/projects_collection';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component( {
    selector: 'projects-projects-collection',
    templateUrl: './projects-collection.component.html',
    styleUrls: ['./projects-collection.component.scss'],
} )
export class ProjectsCollectionComponent implements OnInit, OnDestroy {
    projects: ProjectsCollection = {};
    update_todo_value_subscription!: Subscription;

    constructor ( public projects_serive: ProjectsService ) { }

    ngOnInit (): void {
        this.projects_serive.get_all_projects().then( ( val: Array<Project> ) => {
            const temp = val.map( ( el ) => {
                el.todos = _.keyBy( el.todos, ( o ) => {
                    return o.id;
                } ) as any;
                return el as ProjectsCollectionElement;
            } );
            this.projects = _.keyBy( temp, ( o ) => {
                return o.id;
            } );
        } );

        this.update_todo_value_subscription = this.projects_serive.update_todo_value_subject.subscribe( ( val ) => {
            this.projects[val.project_id].todos[val.todo_id].isCompleted = val.new_value;
        } );
    }

    ngOnDestroy (): void {
        this.update_todo_value_subscription.unsubscribe();
    }
}
