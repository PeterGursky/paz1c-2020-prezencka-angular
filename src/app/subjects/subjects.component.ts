import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/entities/subject';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[];
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getSubjects().subscribe(subjects => {
      this.subjects = subjects
      console.log("Predmety prišli: ", subjects);
    });
  }

}
