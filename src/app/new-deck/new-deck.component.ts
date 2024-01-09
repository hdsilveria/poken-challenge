import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Card } from '../../models/card.model';
import { DeckService } from '../deck/service.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'new-deck',
  standalone: true,
  imports: [
    ListComponent,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [DeckService],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss'
})

export class NewDeckComponent {
  public form: FormGroup;
  public errorMensage: string = ''

  constructor(
    private fb: FormBuilder,
    private deckService: DeckService,
    private router: Router
  ){
    this.form = this.fb.group({
      name: ['', Validators.required],
      cards: [[], Validators.required],
    });
  }
  
  fillFormWithCard(card: Card){
    let cardsArray = this.form.get('cards')?.value || [];
    const cardIndex = cardsArray.findIndex((c: Card) => c.id === card.id);

    this.errorMensage = ''
  
    if (cardIndex !== -1) {
      cardsArray.splice(cardIndex, 1);
    } else {
      cardsArray.push(card);
    }
  
    this.form.patchValue({
      name: this.form.get('name')?.value,
      cards: cardsArray,
    });
  }
  
  submitDeck(): void {
    const name: string = this.form.get('name')?.value;
    const cards: Card[] = this.form.get('cards')?.value;

    if (cards.length < 24 || cards.length > 60) {
      this.errorMensage = 'O baralho deve ter entre 24 e 60 cartas.'
      return;
    }

    if (this.form.valid) {
      const cardNameCounts = new Map<string, number>();
      for (const card of cards) {
        const cardName = card.name;
        const count = cardNameCounts.get(cardName) || 0;
        if (count >= 4) {
          this.errorMensage =  `Apenas 4 cartas com o mesmo nome (${cardName}) são permitidas no baralho.`
          return;
        }
        cardNameCounts.set(cardName, count + 1);
      }

      this.deckService.addNewDeck(cards, 24, name);
      this.router.navigate(['/']);
    }
  }
}