import { Injectable } from '@angular/core';
import * as axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable( {
    providedIn: 'root',
} )
export class ProjectsService {
    api_url = environment.api_url;

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
}
