import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Card } from '../models/card.model';
import { Deck } from '../models/deck.model';
import { RequestData } from './list/list.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient
  ) {}

  private url: string = environment.apiUrl

  public getCards(): Observable<RequestData<Card>>{
    return this.http.get<RequestData<Card>>(`${this.url}/cards`);
  }

  public getDecks(): Observable<RequestData<Deck>>{
    return this.http.get<RequestData<Deck>>(`${this.url}/sets`);
  }
}
