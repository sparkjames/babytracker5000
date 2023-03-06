import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListingItemComponent } from './notes-listing-item.component';

describe('NotesListingItemComponent', () => {
  let component: NotesListingItemComponent;
  let fixture: ComponentFixture<NotesListingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesListingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesListingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
