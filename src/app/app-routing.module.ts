import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes/notes-list/notes-list.component';

const routes: Routes = [
  // { path: '', redirectTo: '/babytracker', pathMatch: 'full' },
  { path: '', component: NotesListComponent, pathMatch: 'full' }
  // login
  // account
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
