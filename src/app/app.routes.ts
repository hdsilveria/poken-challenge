import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewDeckComponent } from './new-deck/new-deck.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'novo-baralho', component: NewDeckComponent },
];