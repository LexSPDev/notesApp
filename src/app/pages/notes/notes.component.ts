import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NoteServiceService } from 'src/app/shared/services/note.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() user: any;
  notes: any;
  vacio = true;
  constructor(  public authService: AuthService,
                public noteService: NoteServiceService,
                private toastr: ToastrService
                ) { }
  
  async ngOnInit(): Promise<void> {
    await this.getNotes()
  }

  async getNotes(){
    this.noteService.getNotes(this.user).subscribe( ( notas ) => {
      notas = notas
      this.notes = notas
      this.setVacio(this.notes.length)
    })
    
  }
  setVacio(length: number){
    if(length === 0) {
      this.vacio = false
    } else {
      this.vacio = true
    }
  }
  eliminarNota(id: string){
    this.noteService.deleteNote(this.user, id) 
    this.toastr.error( 'Borraste la nota con éxito' , 'NotesApp', { timeOut: 3000 });
  }

}
