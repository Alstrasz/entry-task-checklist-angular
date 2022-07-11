import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';

@Component( {
    selector: 'projects-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss'],
} )
export class WindowComponent implements OnInit {
    constructor ( public projects_serive: ProjectsService ) { }

    ngOnInit (): void {
        this.projects_serive.get_all_projects().then( console.log );
    }
}
