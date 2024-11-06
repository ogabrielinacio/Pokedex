import { Pokemon } from "./pokemon.model";

export interface CategoryPaginated {
  id: number;
  name: string;
  next: string;
  previous: string;
  currentListSize: number;
  totalListSize: number;
  totalPages: number;
  pokemons: Pokemon[];
}
