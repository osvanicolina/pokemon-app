import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCardsComponent } from './components/pokemon-cards/pokemon-cards.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorSnackBarComponent } from './components/error-snack-bar/error-snack-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardsComponent,
    PokemonDetailsComponent,
    LoadingComponent,
    ErrorSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents:[ErrorSnackBarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
