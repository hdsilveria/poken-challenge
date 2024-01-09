import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeckComponent } from '../deck/deck.component';
import { ListComponent } from '../list/list.component';
import { RequestLoaderService } from '../request-loader.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    DeckComponent, 
    ListComponent,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(public requestLoaderService: RequestLoaderService) {}

  ngOnInit(): void {
    this.requestLoaderService.setLoading(true)
  }

}
