import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NoteStorageService } from './notes/note-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private noteStorageSubscription: Subscription = new Subscription;

  constructor( private noteStorageService: NoteStorageService ){}

  ngOnInit(): void {
    this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
  }

  ngOnDestroy(): void {
    this.noteStorageSubscription.unsubscribe();
  }

}
