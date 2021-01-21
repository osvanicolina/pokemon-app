import { ability } from './abilityModel';
import { nameURLModel } from './pokemonListModel';
import { gameIndexModel } from './gameIndexModel';
import { moveModel } from './movesModel';
import { spritesModel } from './spritesModel';
import { pokemonStatModel } from './pokemonStatModel';
import { pokemonTypeModel } from './pokemonTypeModel';
export class pokemonModel{
    abilities: ability[];
    base_experience: number;
    evolve_from: nameURLModel;
    forms: nameURLModel[];
    game_indices: gameIndexModel[];
    have_evolve_from: boolean;
    height: number;
    held_items: nameURLModel[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: moveModel[];
    name: string;
    order: number;
    species: nameURLModel;
    sprites: spritesModel;
    stats: pokemonStatModel[];
    types: pokemonTypeModel[];
    weight: number;
}