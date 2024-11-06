import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";
import { OperationResult } from '../../models/operation-result.model';
import { ResultPaginated } from '../../models/result-paginated.model';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, PokemonListComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
   searchResult: OperationResult<ResultPaginated> = {
    isSuccess: false,
    value: new ResultPaginated(),
    errorMessage: '',
    code: 0,
  };

  onSearchResults(results: OperationResult<ResultPaginated>) {
    this.searchResult = results;
  }
}
