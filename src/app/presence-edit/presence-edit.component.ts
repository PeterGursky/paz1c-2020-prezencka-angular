import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Presence } from 'src/entities/presence';
import { Student } from 'src/entities/student';

declare var $: any;

@Component({
  selector: 'app-presence-edit',
  templateUrl: './presence-edit.component.html',
  styleUrls: ['./presence-edit.component.css']
})
export class PresenceEditComponent implements OnChanges {

  @Input() presence: Presence;
  @Output('save') editedPresence$ = new EventEmitter<Presence>();
  presenceToEdit: Presence;
  presented: Map<Student, boolean> = new Map<Student, boolean>();
  isStudentChecked: boolean;

  constructor() { }
  
  ngOnChanges(): void {
    if (this.presence) {
      this.presenceToEdit = Presence.clone(this.presence);
      this.presented.clear();
      for(let student of this.presenceToEdit.subject.students) {
        if (this.presenceToEdit.students.findIndex(s => s.id == student.id) > -1) {
          this.presented.set(student, true)
        } else {
          this.presented.set(student, false);
        }
      }
      this.checkStudents();
    } 
  }

  dateChanged(eventDate: string): Date | null {
    const result = !!eventDate ? new Date(eventDate) : null;
    console.log(this.presenceToEdit);
    return result;
  }

  checkStudents() {
    this.isStudentChecked = false;
    for (const value of Array.from(this.presented.values())) {
      if (value) {
        this.isStudentChecked = true;
        return;
      }
    }
  }

  toggleStudent(student: Student) {
    const checked = !this.presented.get(student);
    this.presented.set(student, checked);
    if (checked) {
      this.presenceToEdit.students.push(student);
    } else {
      this.presenceToEdit.students = 
        this.presenceToEdit.students.filter(s => s.id != student.id)
    }
    this.checkStudents();
    console.log(this.presented);
  }

  onSubmit() {
    this.editedPresence$.emit(this.presenceToEdit);
    $("#exampleModal").modal("hide");
  }
}
