import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from '../error-snack-bar/error-snack-bar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  filterForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private pokeApiService: PokeApiService,
              private _snackBar: MatSnackBar) { 
    
    this.filterForm = this.formBuilder.group({
      pokemonName: ['', ],
      pokemonTypeName: ['',]
    }, {});
    
    this.filterForm.valueChanges.subscribe(()=> {
      this.pokemonFilter(this.filterForm.get('pokemonName').value);
    });

    this.pokeApiService.getFirstGenList()
      .subscribe( data => { 
        this.pokemonList = data;
        this.loading = false;
        this.getPokemonsToShow(this.pokemonList.slice(0,25));
      }, (errorService) => {
        this.messageError = errorService.error.error.message;
        this.error = true;
      });
  }

  ngOnInit() {
  }
  
  pokemonFilter(term: string){
    let pokemonFiltered = this.pokemonList.filter( (pokemon)=>{
      if(pokemon.name.indexOf(term.toLocaleLowerCase()) === -1){
        return false;
      }else{
        return true;
      }
    });
    if(pokemonFiltered.length > 25){
      pokemonFiltered = pokemonFiltered.slice(0,25);
    }
    this.getPokemonsToShow(pokemonFiltered);
    if(pokemonFiltered.length == 0){
      this._snackBar.openFromComponent(ErrorSnackBarComponent, {
        duration: 5 * 1000,
      });
    }
  }

  private getPokemonsToShow(pokemonList: any[]){ //Se le pasa una lista de máximo 25 elementos
    this.pokemonsToShow = [];
    pokemonList.forEach((pokemon)=>{
      this.pokeApiService.getPokemonByUrl(pokemon.url)
        .subscribe( data => {
          this.pokemonsToShow.push(data);
          //Obtenemos el origen del pokemon
          this.pokeApiService.getPokemonSpecies(data['id'])
            .subscribe(pokemonData => {
              if(pokemonData['evolves_from_species']){
                data['have_evolve_from'] = true;
              }else{
                data['have_evolve_from'] = false;
              }
              return data['evolve_from'] = pokemonData['evolves_from_species']
            });

          //Ordenamos al listar el último elemento
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
          }
        }, (error) => console.log(error));
    });
  }
}
