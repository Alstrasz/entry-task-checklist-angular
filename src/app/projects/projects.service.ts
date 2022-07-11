import { Injectable } from '@angular/core';
import * as axios from 'axios';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( {
    providedIn: 'root',
} )
export class ProjectsService {
    api_url = environment.api_url;
    update_todo_value_subject: Subject<{ project_id: number, todo_id: number, new_value: boolean }> = new Subject;

    constructor () { }

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
}
