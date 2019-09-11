import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss']
})
export class PokemonCardsComponent {
  @Input() pokemonsToShow: any[] = [];

  constructor(private router: Router) {
    console.log("Beginning pokemon-cards component!");
   }

  ngOnInit() {
    console.log(this.pokemonsToShow[0]);
  }
  
  pokemonDetails(pokemon: any){
    console.log(pokemon);
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
