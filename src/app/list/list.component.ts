import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Card } from '../../models/card.model';
import { AppService } from '../app.service';
import { RequestLoaderService } from '../request-loader.service';
import { CardComponent } from './card/card.component';
import { RequestData } from './list.model';

@Component({
  selector: 'listCard',
  standalone: true,
  imports: [
    CardComponent, 
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    RequestLoaderService
  ]
})

export class ListComponent implements OnInit {
  constructor(
    private service: AppService,
    public requestLoaderService: RequestLoaderService
  ){}

  public listCard: Card[] = []
  
  @Output() cardClicked = new EventEmitter<Card>();

  onCardClick(data: Card): void {
    this.cardClicked.emit(data)
    data.selected = !data.selected;
  }

  ngOnInit(): void {
    this.service.getCards().subscribe(
      (result: RequestData<Card>) => {
        this.requestLoaderService.setLoading(false)
        this.listCard = result.data
      }
    )
  }
}
