import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss']
})
export class PokemonCardsComponent {
  @Input() pokemonsToShow: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {}
  
  pokemonDetails(pokemon: any){
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
