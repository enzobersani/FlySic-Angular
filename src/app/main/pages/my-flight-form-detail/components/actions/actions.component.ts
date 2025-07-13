import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { ModalComponent } from "../../../../../shared/components/modals/modal/modal.component";
import { ButtonSecondaryComponent } from "../../../../../shared/components/forms/buttons/button-secondary/button-secondary.component";
import { NgIf } from '@angular/common';
import { RatingComponent } from "../../../../../shared/components/feedback/rating/rating.component";
import { TextareaComponent } from "../../../../../shared/components/forms/textarea/textarea.component";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [ButtonPrimaryComponent, ModalComponent, ButtonSecondaryComponent, NgIf, RatingComponent, TextareaComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit{
  @ViewChild('modalActions') modalActions!: ModalComponent;
  selectedAction: 'finalizar' | 'cancelar' | null = null;
  form!: FormGroup;
  rating: number = 5;
  
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      comentarioFinalizacao: new FormControl(''),
      comentarioCancelamento: new FormControl('')
    });
  }

  finishFlight() {
    this.selectedAction = 'finalizar';
    this.modalActions.open();
  }

  cancelFlight() {
    this.selectedAction = 'cancelar';
    this.modalActions.open();
  }

  
  confirmAction() {
    if (this.selectedAction === 'finalizar') {
      const comentario = this.form.get('comentarioFinalizacao')?.value;
      const nota = this.rating;

      console.log('Finalizando voo...');
      console.log('Nota:', nota);
      console.log('Comentário:', comentario);

      // Chamada à API para finalizar voo com nota e comentário
    }

    this.modalActions.close();
    this.form.reset();
    this.selectedAction = null;
    this.rating = 5;
  }

  closeModal() {
    this.modalActions.close();
    this.form.reset();
    this.selectedAction = null;
    this.rating = 5;
  }
}
