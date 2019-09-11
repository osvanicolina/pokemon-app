import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: 'home', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent}, 
  { path: '', pathMatch: 'full', redirectTo:'home' },  
  { path: '**', pathMatch: 'full', redirectTo:'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
