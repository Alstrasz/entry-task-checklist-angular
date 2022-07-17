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
    update_project_subscription!: Subscription;
    api_toggle_subscription!: Subscription;

    constructor ( public projects_serive: ProjectsService ) { }

    ngOnInit (): void {
        this.update_todo_value_subscription = this.projects_serive.update_todo_value_subject.subscribe( ( val ) => {
            this.projects[val.project_id].todos[val.todo_id].isCompleted = val.new_value;
        } );

        this.update_project_subscription = this.projects_serive.update_project_subject.subscribe( ( val ) => {
            this.projects[val.id] = this.project_to_project_collection_element( val );
        } );

        this.api_toggle_subscription = this.projects_serive.api_toggle_subject.subscribe( () => {
            this.init_data();
        } );

        this.init_data();
    }

    ngOnDestroy (): void {
        this.update_todo_value_subscription.unsubscribe();
        this.update_project_subscription.unsubscribe();
        this.api_toggle_subscription.unsubscribe();
    }


    /**
     * Converts Project to ProjectsCollectionElement.
     * Changes val in the process
     *
     * @param {Project} val
     * @return {*}  {ProjectsCollectionElement}
     * @memberof ProjectsCollectionComponent
     */
    project_to_project_collection_element ( val: Project ): ProjectsCollectionElement {
        return {
            id: val.id,
            title: val.title,
            todos: _.keyBy( _.map( val.todos, ( todo ) => {
                return _.cloneDeep( todo );
            } ), ( o ) => {
                return o.id;
            } ),
        };
    }

    init_data () {
        this.projects = {};

        this.projects_serive.get_all_projects().then( ( val: Array<Project> ) => {
            console.log( val, _.isArray( val ) );
            const temp = val.map( this.project_to_project_collection_element );
            this.projects = _.keyBy( temp, ( o ) => {
                return o.id;
            } );
        } );
    }
}
