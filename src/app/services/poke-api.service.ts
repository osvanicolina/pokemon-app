import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private pokemonList: any[] = [];

  constructor(private http: HttpClient) { 
    console.log("Poke-Api Service ready!");
  }

  getQuery(query: string){
    const url: string = `https://pokeapi.co/api/v2/${query}`;
    return this.http.get(url).pipe( map( data => data['results'] ));
  }

  getFirstGenList(){
    return this.getQuery('pokemon/?limit=151');
  }

  getPokemonByUrl(url: string){
    return this.http.get(url);
  }

  getPokemonById(id: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
  
  getPokemonSpecies(id:number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }

}
