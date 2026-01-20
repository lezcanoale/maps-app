import { Routes } from '@angular/router';
import FullscreenMapPageComponent from './pages/fullscreen-map-page/fullscreen-map-page';
import MarkersPageComponent from './pages/markers-page/markers-page';
import { HousesPageComponent } from './pages/houses-page/houses-page';

export const routes: Routes = [
  {
    path: 'fullscreen',
    loadComponent: () => FullscreenMapPageComponent,
    title: 'Fullscreen Map',
  },
  {
    path: 'markers',
    loadComponent: () => MarkersPageComponent,
    title: 'Marcadores',
  },
  {
    path: 'houses',
    component: HousesPageComponent,
    title: 'Propiedades disponibles',
  },
  {
    path: '**',
    redirectTo: 'fullscreen',
  },
];
