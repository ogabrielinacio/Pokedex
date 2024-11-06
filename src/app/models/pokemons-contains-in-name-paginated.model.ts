import { Pokemon } from './pokemon.model';

export interface PokemonsContainsInNamePaginated {
  containsInName: string;
  next: string;
  previous: string;
  currentListSize: number;
  totalListSize: number;
  totalPages: number;
  pokemons: Pokemon[];
}
