import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window/window.component';
import { ProjectsCollectionComponent } from './projects-collection/projects-collection.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TodoInteractiveComponent } from './todo-interactive/todo-interactive.component';
import { ModalCreateProjectComponent } from './modal-create-project/modal-create-project.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule( {
    declarations: [
        WindowComponent,
        ProjectsCollectionComponent,
        ProjectCardComponent,
        TodoInteractiveComponent,
        ModalCreateProjectComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatGridListModule,
        MatToolbarModule,
        MatListModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
    ],
    exports: [
        WindowComponent,
    ],
} )
export class ProjectsModule { }
