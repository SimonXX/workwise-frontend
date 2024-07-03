import {Router} from "@angular/router";

;import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../core/models/user.model";
import {DatePipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    FormsModule
  ],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css'
})
export class CandidateProfileComponent implements OnInit{


  user: any; // Definisci l'oggetto user con i campi necessari

  editedUser: any; // Variabile per la copia dell'utente in modalità di editing
  editingMode = false; // Variabile per gestire lo stato di editing

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.editedUser = { ...this.user };
    this.user = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      address: '123 Main St, City',
      dateOfBirth: new Date('1990-01-01'),
      createdDate: new Date(),
      cv: null,
      role: {
        id: 1,
        name: 'CANDIDATE'
      }
    }
  }

  downloadCV(): void {
    // Implementa la logica per il download del CV
    console.log('Download CV clicked');
  }


  goToCandidateArea(): void {
    // Naviga alla pagina candidateArea
    this.router.navigate(['/candidateArea']);
  }

  editProfile() {
    this.editingMode = true;
    // Copia l'utente per permettere modifiche
    this.editedUser = { ...this.user };
  }

  saveChanges() {
    // Esempio di chiamata API per salvare le modifiche

  }

  cancelEditing() {
    this.editingMode = false; // Annulla le modifiche e ritorna alla visualizzazione normale
  }

// Metodo per gestire l'evento keydown per il campo telefono
  onKeyDown(event: KeyboardEvent) {
    // Ottieni il valore dell'input corrente
    const inputValue = (event.target as HTMLInputElement).value;

    // Controlla se il tasto premuto è un numero o il tasto Backspace/Delete
    if (
      // Numeri da 0 a 9
      (event.key >= '0' && event.key <= '9') ||
      // Tasti speciali per la gestione dell'input (Backspace, Delete)
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      // Se il tasto è valido, permetti l'input
      return true;
    } else {
      // Altrimenti, previeni l'input del carattere
      event.preventDefault();
      return false;
    }
  }
}
