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
  filtro: string = "";
  
  constructor(private pokeApiService: PokeApiService) { 
    console.log('Beginning PokemonListComponent!');
    this.pokeApiService.getFirstGenList()
      .subscribe( data => { 
        this.pokemonList = data;
        console.log(this.pokemonList); //Muestra los 151 pokemons
        this.getPokemonsToShow(this.pokemonList.slice(0,25));
      }, (errorService) => {
        this.messageError = errorService.error.error.message;
        this.error = true;
      });
  }

  ngOnInit() {
  }
  
  pokemonFilter(term: string){
    console.log("Filtering: " + term);
    let pokemonFiltered = this.pokemonList.filter( (pokemon)=>{
      if(pokemon.name.indexOf(term) === -1){
        return false;
      }else{
        return true;
      }
    });
    console.log(pokemonFiltered);
    if(pokemonFiltered.length > 25){
      pokemonFiltered = pokemonFiltered.slice(0,25);
    }
    this.getPokemonsToShow(pokemonFiltered);
  }

  private getPokemonsToShow(pokemonList: any[]){ 
    this.pokemonsToShow = [];
    this.loading = true;
    pokemonList.forEach((pokemon)=>{
      this.pokeApiService.getPokemonByUrl(pokemon.url)
        .subscribe( data => {
          this.pokemonsToShow.push(data);
          if(this.pokemonsToShow.length === pokemonList.length || this.pokemonsToShow.length === 25){  

            this.pokemonsToShow.sort( (pokemonA,pokemonB) =>{
              if(pokemonA.id > pokemonB.id){
                return 1;
              }
              if(pokemonA.id < pokemonB.id){
                return -1;
              }
              return 0;
            });
            console.log(this.pokemonsToShow);
            this.loading = false;
          }
        }, (error) => console.log(error));
    });
  }
}
