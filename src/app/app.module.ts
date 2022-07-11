import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectsModule } from './projects/projects.module';

@NgModule( {
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ProjectsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
} )
export class AppModule { }