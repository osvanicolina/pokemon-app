import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  constructor(private activateRoute: ActivatedRoute,
              private pokeApiService: PokeApiService) {
    this.activateRoute.params.subscribe( params =>{
      console.log('Pokemon ID: ' + params['id']);
      this.pokeApiService.getPokemonById(params['id'])
        .subscribe( data => this.pokemon = data, error => console.log(error));
    });
  }

  ngOnInit() {
  }

}
