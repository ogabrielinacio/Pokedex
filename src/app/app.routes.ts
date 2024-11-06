import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pokemon/:name', component: PokemonDetailsComponent },
    { path: '**', component: PageNotFoundComponent },
];
