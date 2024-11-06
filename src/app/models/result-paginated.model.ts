import { Pokemon } from './pokemon.model';

export class ResultPaginated {
  containsInName: string = '';
  typeName: string = '';
  typeId: number = 0;
  habitatName: string = '';
  habitatId: number = 0;
  next: string = '';
  previous: string = '';
  currentListSize: number = 0;
  totalListSize: number = 0;
  totalPages: number = 0;
  pokemons: Pokemon[] = [];

  constructor(init?: Partial<ResultPaginated>) {
    Object.assign(this, init);
  }
}