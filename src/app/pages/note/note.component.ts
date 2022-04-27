import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteServiceService } from 'src/app/shared/services/note.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  currDate = this.dp.transform( new Date(), 'short' );
  hr = this.dp.transform( new Date(), 'h' );
  minuto = this.dp.transform( new Date(), 'mm' );
  segundo = this.dp.transform( new Date(), 'ss' );
  titulo = 'Agregar Nota'
  
  id = `nota${this.hr}${this.minuto}${this.segundo}${this.hr}`
  editId: string | null ;
  constructor(  public authService: AuthService,
                public router: Router,
                private fb: FormBuilder,
                private dp: DatePipe,
                private aRoute: ActivatedRoute,
                public noteService: NoteServiceService,
                private toastr: ToastrService) {
                  this.editId = this.aRoute.snapshot.paramMap.get('id');
                  
                 }
  
  noteForm = this.fb.group({
    Fecha: [this.currDate],
    Titulo: ['', [Validators.required, Validators.pattern('[a-zA-Z ñÑáéíóúÁÉÍÓÚ.,]*')]],
    Contenido: ['', [Validators.required, Validators.minLength(25)]],
  });
  ngOnInit(): void {
    this.setNota();
  }

  onSubmit() {
    if (this.editId === null){
      this.agregar()
    } else {
      this.editar()
    }
  }
  setNota(){
    if (this.editId !== null){
      this.titulo = 'Modificar Nota'
      this.noteService.setNote(JSON.parse(localStorage.getItem('user')!).uid, this.editId,).subscribe(data => {
        this.noteForm.setValue({
          Fecha: data.payload.data()!['Fecha'],
          Titulo: data.payload.data()!['Titulo'],
          Contenido: data.payload.data()!['Contenido'],
        })
      })
    }
  }
  agregar(){
    const form = this.noteForm.value
    if(this.noteForm.valid){
      const newId = {
        id : this.id  
      };
      const data = Object.assign(form,newId)
      this.noteService.createNote(JSON.parse(localStorage.getItem('user')!).uid, data, this.id)
      this.router.navigate(['dashboard']);
      this.toastr.success( 'Agregaste la nota con éxito' , 'NotesApp', { timeOut: 3000 });
    } else {
      console.log(this.noteForm.errors)
      this.toastr.error( 'La nota no puede ser agregada' , 'NotesApp', { timeOut: 3000 });
    }
  }
  editar(){
    if(this.noteForm.valid){
    const form = this.noteForm.value
    this.noteService.modifyNote(JSON.parse(localStorage.getItem('user')!).uid, form, this.editId)
    this.router.navigate(['dashboard']);
    this.toastr.success( 'Modificaste la nota con éxito' , 'NotesApp', { timeOut: 3000 });
    } else {
      console.log(this.noteForm.get('Contenido')?.errors)
      this.toastr.error( 'La nota no puede ser agregada' , 'NotesApp', { timeOut: 3000 });
    }
  }
}
