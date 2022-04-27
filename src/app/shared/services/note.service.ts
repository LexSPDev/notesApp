import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor( public afs: AngularFirestore,  ) { }

  getNotes(id: any){
    return this.afs
            .collection('notas')
            .doc('notas_generadas')
            .collection(id)
            .valueChanges()
  }

  createNote(uid: any, data: any, id: any){
    return this.afs
    .collection('notas')
    .doc('notas_generadas')
    .collection(uid)
    .doc(id)
    .set(data)
  }
  deleteNote(uid: any, id: any){
    return this.afs
    .collection('notas')
    .doc('notas_generadas')
    .collection(uid)
    .doc(id)
    .delete()
  }
  setNote(uid: any, id: any){
    return this.afs
    .collection('notas')
    .doc('notas_generadas')
    .collection(uid)
    .doc(id)
    .snapshotChanges()
  }
  modifyNote(uid: any, data: any, id: any){
    return this.afs
    .collection('notas')
    .doc('notas_generadas')
    .collection(uid)
    .doc(id)
    .update(data)
  }

}
