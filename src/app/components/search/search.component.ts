import { PageStateService } from './../../services/page-state.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResultPaginated } from '../../models/result-paginated.model';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { OperationResult } from '../../models/operation-result.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() getSearchResults = new EventEmitter<OperationResult<ResultPaginated>>();


  searchContainsName: string = '';
  selectedType: string = '';
  selectedHabitat: string = '';

  constructor(private pokemonService: PokemonApiService, private pageStateService:PageStateService) {}

  ngOnInit() {
    const state = this.pageStateService.getState("search-values", false);
    if (state) {
      this.searchContainsName = state.containsInName;
      this.selectedType = state.selectedType;
      this.selectedHabitat = state.selectedHabitat;
    }
  }


  defaultValue = {
    isSuccess: false,
    value: undefined,
    errorMessage: '',
    code: 0,
  };

  pokemonTypes: string[] = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
  ];

  pokemonHabitats: string[] = [
    'cave',
    'forest',
    'grassland',
    'mountain',
    'rare',
    'rough-terrain',
    'sea',
    'urban',
    'waters-edge',
  ];


  handleSearch() {
    if (
      this.searchContainsName &&
      !this.selectedType &&
      !this.selectedHabitat
    ) {
      this.searchPokemonContainsInName();
    } else if (
      this.selectedType &&
      !this.searchContainsName &&
      !this.selectedHabitat
    ) {
      this.searchPokemonByType();
    } else if (
      this.selectedHabitat &&
      !this.searchContainsName &&
      !this.selectedType
    ) {
      this.searchPokemonByHabitat();
    } else if (
      [this.searchContainsName, this.selectedType, this.selectedHabitat].filter(
        (value) => value
      ).length >= 2
    ) {
      this.searchPokemonByMultipleFilters();
    }
  }

  MapToResultPaginated(responseValue: any): ResultPaginated {

    const data: any = responseValue?.value ?? {};
    

    this.pageStateService.setState("search-values", {
      containsInName: this.searchContainsName,
      selectedType: this.selectedType,
      selectedHabitat: this.selectedHabitat,
    }, false);

    return new ResultPaginated({
      containsInName: data.containsInName ?? '',
      typeName: data.typeName ?? '',
      typeId: data.typeId ?? 0,
      habitatName: data.habitatName ?? '',
      habitatId: data.habitatId ?? 0,
      next: data.next ?? '',
      previous: data.previous ?? '',
      currentListSize: data.currentListSize ?? 0,
      totalListSize: data.totalListSize ?? 0,
      totalPages: data.totalPages ?? 0,
      pokemons: data.pokemons ?? [],
    });
  }

  searchPokemons() {
    this.pokemonService.getPokemons(1, 10).subscribe((response) => {
      this.getSearchResults.emit({
        isSuccess: response.isSuccess,
        value: this.MapToResultPaginated(response),
        errorMessage: response.errorMessage,
        code: response.code,
      });
    });
  }

  searchPokemonContainsInName() {
    this.pokemonService
      .getPokemonsContainsInName(this.searchContainsName.toLowerCase(), 1, 10)
      .subscribe((response) => {
        this.getSearchResults.emit({
          isSuccess: response.isSuccess,
          value: this.MapToResultPaginated(response),
          errorMessage: response.errorMessage,
          code: response.code,
        });
      });
  }

  searchPokemonByType() {
    this.pokemonService
      .getPokemonsByType(this.selectedType, 1, 10)
      .subscribe((response) => {
        this.getSearchResults.emit({
          isSuccess: response.isSuccess,
          value: this.MapToResultPaginated(response),
          errorMessage: response.errorMessage,
          code: response.code,
        });
      });
  }

  searchPokemonByHabitat() {
    this.pokemonService
      .getPokemonsByHabitat(this.selectedHabitat, 1, 10)
      .subscribe((response) => {
        this.getSearchResults.emit({
          isSuccess: response.isSuccess,
          value: this.MapToResultPaginated(response),
          errorMessage: response.errorMessage,
          code: response.code,
        });
      });
  }

  searchPokemonByMultipleFilters() {
    this.pokemonService
      .getPokemonsByMultipleFilters(
        this.searchContainsName,
        this.selectedType,
        this.selectedHabitat,
        1,
        10
      )
      .subscribe((response) => {
        this.getSearchResults.emit({
          isSuccess: response.isSuccess,
          value: this.MapToResultPaginated(response),
          errorMessage: response.errorMessage,
          code: response.code,
        });
      });
  }
}
