import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTodoComponent } from './modal-create-todo.component';

describe( 'ModalCreateTodoComponent', () => {
    let component: ModalCreateTodoComponent;
    let fixture: ComponentFixture<ModalCreateTodoComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [ModalCreateTodoComponent],
        } )
            .compileComponents();

        fixture = TestBed.createComponent( ModalCreateTodoComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
