import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss']
})
export class PokemonCardsComponent {
  @Input() pokemonsToShow: any[] = [];

  constructor() {
    console.log("Beginning pokemon-cards component!");
   }

  ngOnInit() {
    console.log(this.pokemonsToShow[0]);
  }

}
