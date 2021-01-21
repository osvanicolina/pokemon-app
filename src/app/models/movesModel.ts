import { nameURLModel } from './pokemonListModel';
export class moveGroupDetails{
    level_learned_at: number;
    move_learn_method: nameURLModel;
    version_group: nameURLModel;
}

export class moveModel{
    move: nameURLModel;
    version_group_method: moveGroupDetails[]
}