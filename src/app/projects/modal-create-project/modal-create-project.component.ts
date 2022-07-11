import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component( {
    selector: 'app-modal-create-project',
    templateUrl: './modal-create-project.component.html',
    styleUrls: ['./modal-create-project.component.scss'],
} )
export class ModalCreateProjectComponent implements OnInit {
    constructor ( @Inject( MAT_DIALOG_DATA ) public data: { project_title: string } ) { }

    ngOnInit (): void {
    }
}
