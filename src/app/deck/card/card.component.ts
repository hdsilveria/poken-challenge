import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'deck-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data!: Card;
}
