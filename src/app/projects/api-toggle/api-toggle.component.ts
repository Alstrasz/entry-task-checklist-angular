import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';

@Component( {
    selector: 'projects-api-toggle',
    templateUrl: './api-toggle.component.html',
    styleUrls: ['./api-toggle.component.scss'],
} )
export class ApiToggleComponent implements OnInit {
    constructor ( public projects_service: ProjectsService ) { }

    ngOnInit (): void {
    }

    toggle_api () {
        this.projects_service.set_use_graphql( !this.projects_service.use_graphql );
    }
}
