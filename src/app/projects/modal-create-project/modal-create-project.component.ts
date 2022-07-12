import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../projects.service';

@Component( {
    selector: 'app-modal-create-project',
    templateUrl: './modal-create-project.component.html',
    styleUrls: ['./modal-create-project.component.scss'],
} )
export class ModalCreateProjectComponent implements OnInit {
    new_project_form!: FormGroup;

    constructor (
        @Inject( MAT_DIALOG_DATA ) public data: { project_title?: string },
        private fb: FormBuilder,
        private projects_service: ProjectsService,
        public dialogRef: MatDialogRef<ModalCreateProjectComponent>,
    ) { }

    ngOnInit (): void {
        this.new_project_form = this.fb.group( {
            title: [this.data?.project_title || '', [Validators.required]],
            text: ['', [Validators.required]],
        } );
    }

    send_data () {
        if ( this.new_project_form.valid ) {
            this.projects_service.create_new_todo( this.new_project_form.value ).then( () => {
                this.dialogRef.close();
            } );
        }
    }
}
