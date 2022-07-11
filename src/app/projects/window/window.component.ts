import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';
import { ProjectsService } from '../projects.service';

@Component( {
    selector: 'projects-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss'],
} )
export class WindowComponent implements OnInit {
    constructor (
        public projects_serive: ProjectsService,
        private dialog: MatDialog,
    ) { }

    ngOnInit (): void {

    }

    open_new_project_dialog () {
        console.log( 1 );
        this.dialog.open( ModalCreateProjectComponent, { data: { project_title: '1' } } );
    }
}
