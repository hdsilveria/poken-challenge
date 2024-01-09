import { Injectable } from '@angular/core';
import { Card } from '../../models/card.model';
import { Deck } from './deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decks: Deck[] = []

  public getdecks(): Deck[] {
    return this.decks
  }

  public divideCards(cards: Card[], size: number): void {
    this.decks = []

    for (let i = 0; i < cards.length; i += size) {
      this.decks.push({name: `Baralho ${i}`, items: cards.slice(i, i + size)})
    }

    this.decks.push(JSON.parse(localStorage.getItem('newDeck') || '{}'))
  }

  public addNewDeck(cards: Card[], size: number, name: string): void {
    const newDeck = { 
      name: name, 
      items: cards.slice(0, size) 
    }
    
    localStorage.setItem('newDeck', JSON.stringify(newDeck))
  }

  public deleteDeck(index: number): void {
    this.decks.splice(index, 1)
  }
}