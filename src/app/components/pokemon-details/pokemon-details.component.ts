import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  pokemonSpecies: any;
  evolutionArray: string[] = [];
  loading: boolean = true;
  loadingEvolutions: boolean = true;
  shiny: boolean = false;
  back: boolean = false;
  principalType: string;

  constructor(private activateRoute: ActivatedRoute,
              private pokeApiService: PokeApiService,
              private router: Router) {
    this.activateRoute.params.subscribe( params =>{
      if(isNaN(params['id']) || parseInt(params['id']) > 151 || parseInt(params['id']) < 0 ){
        this.router.navigate(['']);
      }
      else{
        //Get Pokemon details
        this.pokeApiService.getPokemonById(params['id'])
          .subscribe( data => {
            this.pokemon = data;
            this.principalType = data['types'][0].type.name; 
            this.loading = false;
          }, error => console.log(error));
        
        //Get Pokemon chain evolutions
        this.pokeApiService.getPokemonSpecies(params['id'])
          .subscribe( data => {
            this.pokemonSpecies = data;
            this.pokeApiService.getPokemonByUrl(this.pokemonSpecies.evolution_chain.url)
              .subscribe( data => {
                this.getEvolutions(data['chain']);
                this.loadingEvolutions = false;
              }, error => console.log(error));
          }, error => console.log(error));
      }
    });
  }

  ngOnInit() {
  }
  
  private getEvolutions(actualState: any){
    this.evolutionArray.push(actualState.species.name);
    if(actualState.evolves_to.length > 0){
      this.getEvolutions(actualState.evolves_to[0]);
    }
  }

  goHome(){
    this.router.navigate(['']);
  }
}
