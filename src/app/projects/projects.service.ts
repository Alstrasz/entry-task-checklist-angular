import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';
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
    api_toggle_subject: Subject<boolean> = new Subject;

    use_graphql: boolean = true;

    constructor (
        private dialog: MatDialog,
        private apollo: Apollo,
    ) { }

    async get_all_projects (): Promise<Array<Project>> {
        if ( this.use_graphql ) {
            const ALL_PROJECTS = gql` {
                all_projects {
                    id
                    title
                    todos {
                        id
                        text
                        isCompleted
                    }
                }
            }`;
            return new Promise( ( resolve, reject ) => {
                this.apollo
                    .watchQuery( {
                        query: ALL_PROJECTS,
                    } ).valueChanges.subscribe( ( res ) => {
                        console.log( res );
                        if ( ( res.data as any )?.all_projects ) {
                            console.log( 'resolved' );
                            resolve( ( res.data as any )?.all_projects as Array<Project> );
                        } else {
                            console.log( 'Get all error', res );
                            reject( res );
                        }
                    } );
            } );
        } else {
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

    async update_todo_value ( project_id: number, todo_id: number, new_value: boolean ) {
        if ( this.use_graphql ) {
            const UPDATE_TODO = gql`
                mutation set_completed($set_completed_dto: SetCompletedDto!) {
                    set_completed(set_completed_dto: $set_completed_dto ) {
                        text
                        isCompleted
                    }
                }`;

            return new Promise( ( resolve, reject ) => {
                this.apollo
                    .mutate( {
                        mutation: UPDATE_TODO,
                        variables: {
                            set_completed_dto: {
                                id: todo_id,
                                new_value: new_value,
                            },
                        },
                    } ).subscribe( ( res ) => {
                        if ( res.data ) {
                            resolve( undefined );
                        } else {
                            console.log( 'update todo rejected', res );
                            reject( res );
                        }
                    } );
            } );
        } else {
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

    async create_new_todo ( data: NewTodo ) {
        if ( this.use_graphql ) {
            const CREATE_TODO = gql`
                mutation create_todo($create_todo_dto: CreateTodoDto!) {
                    create_todo(create_todo_dto: $create_todo_dto) {
                        id
                        title
                        todos {
                            id
                            text
                            isCompleted
                        }
                    }
                }`;

            return new Promise( ( resolve, reject ) => {
                this.apollo
                    .mutate( {
                        mutation: CREATE_TODO,
                        variables: {
                            create_todo_dto: data,
                        },
                        errorPolicy: 'ignore',
                    } ).subscribe( ( res ) => {
                        console.log( '11111', res );
                        if ( ( res.data as any )?.create_todo ) {
                            this.update_project_subject.next( ( res.data as any )?.create_todo );
                            resolve( ( res.data as any )?.create_todo );
                        } else {
                            console.log( 'update todo rejected', res );
                            reject( res );
                        }
                    } );
            } );
        } else {
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
    }

    open_new_project_dialog ( title: string = '' ) {
        this.dialog.open( ModalCreateProjectComponent, { data: { project_title: title } } );
    }

    set_use_graphql ( new_value: boolean ) {
        console.log( 'Changig api to use graphql: ', new_value );
        this.use_graphql = new_value;
        this.api_toggle_subject.next( this.use_graphql );
    }
}
