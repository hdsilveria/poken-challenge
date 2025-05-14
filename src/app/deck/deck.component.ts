import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Card } from '../../models/card.model';
import { AppService } from '../app.service';
import { RequestData } from '../list/list.model';
import { RequestLoaderService } from '../request-loader.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { CardComponent } from './card/card.component';
import { Deck } from './deck.model';
import { DeckService } from './service.service';

@Component({
  selector: 'deck',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ConfirmComponent,
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent implements OnInit {
  constructor(
    private serviceApp: AppService,
    private serviceDeck: DeckService,
    public dialog: MatDialog,
    private loaderService: RequestLoaderService
  ){}

  public listDeck: Deck | any = []

  editingDeckIndex: number | null = null;

  startEdit(index: number): void {
    this.editingDeckIndex = index;
  }

  stopEdit(): void {
    this.editingDeckIndex = null;
  }

  deleteDeck(index: number, deck: Deck):void {
    const dialogRef = this.dialog.open(
      ConfirmComponent, 
      {
        data: { title: 'Tem certeza que deseja deletar este baralho?' }
      }
    )
    dialogRef.componentInstance.accept.subscribe((result: boolean) => {
      if (result) {
        this.serviceDeck.deleteDeck(index)
        const itemSaved: Deck = JSON.parse(localStorage.getItem('newDeck') || '{}')

        if(deck.name == itemSaved.name){
          localStorage.clear()
        }
      }
    })
  }

  getDetails(deck: Deck): string {
    const typePoke = deck.items?.filter(deck => deck.supertype == "Pokémon").length
    const typeCoach = deck.items?.filter(deck => deck.supertype !== "Pokémon").length

    return `
      Pokémons: ${typePoke} - Outros tipos: ${typeCoach}
    `
  }

  ngOnInit(): void {
    this.serviceApp.getCards().subscribe(
      (result: RequestData<Card>) => {
        this.serviceDeck.divideCards(result.data, 24)
        this.listDeck = this.serviceDeck.getdecks()
        this.loaderService.setLoading(false)
      }
    )
  }
}
