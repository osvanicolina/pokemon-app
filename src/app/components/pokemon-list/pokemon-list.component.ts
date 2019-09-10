import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonsToShow: any[] = [];
  messageError: string;
  error: boolean = false;
  loading: boolean = true;
  
  constructor(private pokeApiService: PokeApiService) { 
    console.log('Beginning PokemonListComponent!');
    this.pokeApiService.getFirstGenList()
      .subscribe( data => { 
        this.pokemonList = data;
        console.log(this.pokemonList);
        this.pokemonList.slice(0,25).forEach( pokemon => {
          this.pokeApiService.getPokemonByUrl(pokemon.url)
            .subscribe( data => {
              this.pokemonsToShow.push(data);
              if(this.pokemonsToShow.length === 25){  

                this.pokemonsToShow.sort( (pokemonA,pokemonB) =>{
                  if(pokemonA.id > pokemonB.id){
                    return 1;
                  }
                  if(pokemonA.id < pokemonB.id){
                    return -1;
                  }
                  return 0;
                });

                this.loading = false;
              }
            });
        });
      }, (errorService) => {
        this.messageError = errorService.error.error.message;
        this.error = true;
      });
  }

  ngOnInit() {
  }

}
