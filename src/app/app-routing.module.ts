import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesGuard } from './notes/notes.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notes',
    component: NotesListComponent,
    canActivate: [NotesGuard],
  }
  // account
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
