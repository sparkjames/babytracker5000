import { Component } from '@angular/core';
import { NotesService } from '../notes/notes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: {
    class: 'app-footer'
  }
})
export class FooterComponent {

  constructor( private notesService: NotesService ){}

  checkUserData(){
    return localStorage.getItem('notes');
  }

  onDeleteOfflineData(){
    const confirmDelete = confirm('This will delete your notes stored in offline mode.');
    if (confirmDelete && localStorage.getItem('notes')) {
      // console.log('YES delete the offline notes');
      localStorage.removeItem('notes');
      this.notesService.setNotes([]);

    } else {
      // console.log('NO do not delete the offline notes.');
    }
  }

}
