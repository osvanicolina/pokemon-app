import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private apiURL = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) {}

  getFirstGenList(){
    return this.http.get(`${this.apiURL}pokemon/?limit=151`).pipe( map( res => res['results'] ));
  }

  getPokemonsByType(pokemonType: string){
    return this.http.get(`${this.apiURL}type/${pokemonType}`).pipe(
      map( res => {
        //We clean the format because is not the same that getFirstGenList's endpoint and we filter only first generation pokemons
        const pokemonList = res['pokemon'];
        const pokemonListCleaned = pokemonList.map(element => {
          return element.pokemon;
        }).filter((element) => element.url.split('/')[6] <= 151);

        return pokemonListCleaned;
      })
    );
  }

  getPokemonByUrl(url: string){
    return this.http.get(url);
  }

  getPokemonById(id: number){
    return this.http.get(`${this.apiURL}pokemon/${id}`);
  }
  
  getPokemonSpecies(id:number){
    return this.http.get(`${this.apiURL}pokemon-species/${id}`);
  }

}
