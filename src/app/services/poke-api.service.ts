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


}
