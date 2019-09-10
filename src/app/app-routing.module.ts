import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: 'home', component: PokemonListComponent }, 
  { path: '', pathMatch: 'full', redirectTo:'home' },  
  { path: '**', pathMatch: 'full', redirectTo:'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
