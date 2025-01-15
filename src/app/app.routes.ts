import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'game/characters',
    loadComponent: () => import('./features/characters/characters.component').then(c => c.CharactersComponent)
  }
];
