import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInteractiveComponent } from './todo-interactive.component';

describe( 'TodoInteractiveComponent', () => {
    let component: TodoInteractiveComponent;
    let fixture: ComponentFixture<TodoInteractiveComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [TodoInteractiveComponent],
        } )
            .compileComponents();

        fixture = TestBed.createComponent( TodoInteractiveComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
