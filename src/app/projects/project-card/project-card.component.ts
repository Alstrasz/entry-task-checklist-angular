import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectsCollectionElement } from '../types/projects_collection';

@Component( {
    selector: 'projects-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
} )
export class ProjectCardComponent implements OnInit {
    @Input() project!: ProjectsCollectionElement;

    constructor ( public projects_service: ProjectsService ) { }

    ngOnInit (): void {
    }
}
