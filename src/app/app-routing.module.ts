import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceComponent } from './presence/presence.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: 'subjects', component: SubjectsComponent },
  { path: 'presence/:idSubject', component: PresenceComponent },
  { path: '**', redirectTo: '/subjects', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
