import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Presence } from 'src/entities/presence';
import { Subject } from 'src/entities/subject';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  idSubject: number;
  presences: Presence[];
  selectedPresence: Presence;
  presenceToEdit: Presence;
  subject: Subject;

  constructor(private activatedRoute: ActivatedRoute,
              private serverService: ServerService) { }

  ngOnInit(): void {
    this.idSubject = this.activatedRoute.snapshot.params['idSubject'];
    this.serverService.getPresences(this.idSubject).subscribe(
      presences => {
        this.presences = presences;
        if (this.presences.length == 0) {
          this.serverService.getSubjects().subscribe(subjects => {
            for (let subj of subjects) {
              if (subj.id == this.idSubject) {
                this.subject = subj;
              }
            }
          })
        } else {
          this.subject = this.presences[0].subject;
        }
        this.selectedPresence = presences[presences.length - 1];
        console.log("Prezenčky pre id " + this.idSubject, presences);
      }
    );
  }

  localDateTime(date: string) {
    return new Date(date).toLocaleDateString('sk-SK', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  addNewPresence() {
    this.presenceToEdit = new Presence(this.subject, new Date());
  }

  editPresence() {
    this.presenceToEdit = this.selectedPresence;
  }

  savePresence(presence: Presence) {
    console.log("Presence to save:", presence);
    this.serverService.savePresence(presence).subscribe( changedPresence => {
      const chPresence = Presence.clone(changedPresence);
      if (presence.id) { //EDIT
        const newPresences = [];
        for (let pres of this.presences) {
          if (pres.id === chPresence.id) {
            newPresences.push(chPresence);
          } else {
            newPresences.push(pres);
          }
        }
        this.presences = newPresences;
        this.selectedPresence = chPresence;
      } else { //ADD
        this.presences.push(chPresence);
        this.selectedPresence = chPresence;
      } 
      console.log("Saved presence:", changedPresence);
      console.log("Cloned presence:", chPresence);
    });
  }

  deletePresence() {
    this.serverService.deletePresence(this.selectedPresence.id).subscribe(ok => {
      if (ok) {
        this.presences = this.presences.filter(p => p.id !== this.selectedPresence.id);
        if (this.presences.length === 0) {
          this.selectedPresence = null;
        } else {
          this.selectedPresence = this.presences[this.presences.length-1];
        }
        console.log('Zmazané');
      } else {
        console.log('Mazanie sa nepodarilo');
      }
    })
  }
}
