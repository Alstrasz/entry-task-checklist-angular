import { Component, Input, OnInit } from '@angular/core';
import { ProjectsCollectionElement } from '../types/projects_collection';

@Component( {
    selector: 'projects-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
} )
export class ProjectCardComponent implements OnInit {
    @Input() project!: ProjectsCollectionElement;

    constructor () { }

    ngOnInit (): void {
    }
}
