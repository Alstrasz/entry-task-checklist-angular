import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as axios from 'axios';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalCreateProjectComponent } from './modal-create-project/modal-create-project.component';
import { NewTodo } from './types/new_todo';
import { Project } from './types/project';

@Injectable( {
    providedIn: 'root',
} )
export class ProjectsService {
    api_url = environment.api_url;
    update_todo_value_subject: Subject<{ project_id: number, todo_id: number, new_value: boolean }> = new Subject;
    update_project_subject: Subject<Project> = new Subject;

    constructor ( private dialog: MatDialog ) { }

    async get_all_projects () {
        return axios.default( {
            baseURL: this.api_url,
            url: '/projects/',
            method: 'GET',
        } )
            .then( ( res ) => {
                return res.data;
            } )
            .catch( ( err ) => {
                console.log( err );
                throw err;
            } );
    }

    async update_todo_value ( project_id: number, todo_id: number, new_value: boolean ) {
        return axios.default( {
            baseURL: this.api_url,
            url: `/projects/${project_id}/todo/${todo_id}`,
            method: 'PATCH',
            data: {
                new_value,
            },
        } )
            .then( ( ) => {
                this.update_todo_value_subject.next( { project_id, todo_id, new_value } );
            } )
            .catch( ( err ) => {
                console.log( err );
                throw err;
            } );
    }

    async create_new_todo ( data: NewTodo ) {
        return axios.default( {
            baseURL: this.api_url,
            url: `/todos`,
            method: 'POST',
            data,
        } )
            .then( ( val ) => {
                this.update_project_subject.next( val.data );
            } )
            .catch( ( err ) => {
                console.log( err );
                throw err;
            } );
    }

    open_new_project_dialog ( title: string = '' ) {
        this.dialog.open( ModalCreateProjectComponent, { data: { project_title: title } } );
    }
}
