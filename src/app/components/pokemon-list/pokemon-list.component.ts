import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from '../error-snack-bar/error-snack-bar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pokemonSimpleModel } from '../../models/pokemonListModel';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: pokemonSimpleModel[] = [];
  pokemonsToShow: any[] = [];
  messageError: string;
  error: boolean = false;
  loading: boolean = true;
  filterForm: FormGroup;
  pokemonTypesOptions: string[] = ['poison','grass','fire','water','electric','normal','flying','bug','ground','psychic','ice','rock','steel','ghost','dark','fairy','fighting','dragon'];
  @ViewChild('pokemonNameInput', { static: false }) pokemonNameInput: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private pokeApiService: PokeApiService,
              private _snackBar: MatSnackBar) { 
    
    this.filterForm = this.formBuilder.group({
      pokemonName: ['', ],
      pokemonTypeName: ['',]
    }, {});
    
    this.filterForm.valueChanges.subscribe(()=> {
      this.loading = true;
      this.filterForm.get('pokemonName').disable({ onlySelf: true });
      const pokemonName = this.filterForm.get('pokemonName').value;
      const pokemonType = this.filterForm.get('pokemonTypeName').value;
      if(pokemonType === ''){
        this.pokeApiService.getFirstGenList()
          .subscribe( data => {
            this.pokemonList = data;
            this.pokemonFilter(pokemonName);
          });
      }else{
        this.pokeApiService.getPokemonsByType(pokemonType).subscribe((data) => {
          this.pokemonList = data;
          this.pokemonFilter(pokemonName);
        });
      }
    });

    this.pokeApiService.getFirstGenList()
      .subscribe( data => { 
        this.pokemonList = data;
        this.loading = false;
        this.getPokemonsToShow(this.pokemonList.slice(0,24));
      }, (errorService) => {
        this.messageError = errorService.error.error.message;
        this.error = true;
      });
  }

  ngOnInit() {
  }
  
  pokemonFilter(term: string){
    let pokemonFiltered = this.pokemonList.filter( (pokemon)=>{
      return pokemon.name.indexOf(term.toLocaleLowerCase()) !== -1;
    });
    if(pokemonFiltered.length > 24){
      pokemonFiltered = pokemonFiltered.slice(0,24);
    }
    this.getPokemonsToShow(pokemonFiltered);
    if(pokemonFiltered.length == 0){
      this.filterForm.get('pokemonName').enable({ onlySelf: true });
      this.pokemonNameInput.nativeElement.focus();
      this.loading = false;
      this._snackBar.openFromComponent(ErrorSnackBarComponent, {
        duration: 5 * 1000,
      });
    }
  }

  private getPokemonsToShow(pokemonList: any[]){ //We show max only 24 elements, for now it doesnt have pagination... so we limit this because API have some request's limit
    this.pokemonsToShow = [];
    pokemonList.forEach((pokemon)=>{
      this.pokeApiService.getPokemonByUrl(pokemon.url)
        .subscribe( data => {
          this.pokemonsToShow.push(data);
          //We get pokemon's chain evolution
          this.pokeApiService.getPokemonSpecies(data['id'])
            .subscribe(pokemonData => {
              data['have_evolve_from'] = pokemonData['evolves_from_species']? true: false;
              return data['evolve_from'] = pokemonData['evolves_from_species'];
            });

          //We sort at the last request
          if(this.pokemonsToShow.length === pokemonList.length || this.pokemonsToShow.length === 24){  

            this.pokemonsToShow.sort( (pokemonA,pokemonB) =>{
              if(pokemonA.id > pokemonB.id){
                return 1;
              }
              if(pokemonA.id < pokemonB.id){
                return -1;
              }
              return 0;
            });
            this.filterForm.get('pokemonName').enable({ onlySelf: true });
            this.pokemonNameInput.nativeElement.focus();
            this.loading = false;
          }
        }, (error) => {this.loading = false;})
    });
  }
}
