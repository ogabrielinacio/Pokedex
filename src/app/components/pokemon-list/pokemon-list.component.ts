import { LoadingComponent } from './../loading/loading.component';
import { LoadingService } from './../../services/loading.service';
import { Component, Input } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { OperationResult } from '../../models/operation-result.model';
import { ResultPaginated } from '../../models/result-paginated.model';
import { FormsModule } from '@angular/forms';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PageStateService } from '../../services/page-state.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, FormsModule, CommonModule, LoadingComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  @Input() searchResult: OperationResult<ResultPaginated> = {
    isSuccess: false,
    value: new ResultPaginated(),
    errorMessage: '',
    code: 0,
  };
  currentPage: number = 1;

  constructor(
    private pokemonService: PokemonApiService,
    private router: Router,
    public loadingService: LoadingService,
    private pageStateService: PageStateService
  ) {}

  ngOnInit() {
    const state = this.pageStateService.getState("list-values", true);
    if (state) {
      this.searchResult = state.searchResult;
      this.currentPage = state.currentPage;
    }
  }

  onPokemonSelected(pokemon: Pokemon): void {
    this.pageStateService.setState("list-values", {
      searchResult: this.searchResult,
      currentPage: this.currentPage,
    }, true);

    this.router.navigate(['/pokemon', pokemon.name], { state: { pokemon } });
  }

  goToPageViaUrl(url: string) {
    const match = url.match(/(?:[?&])pageNumber=(\d+)/);
    let pageNumber = Number(match![1]);
    this.currentPage = pageNumber;

    this.pokemonService.changeToPage(url).subscribe((response) => {
      this.searchResult = response;
    });
  }

  goToPage(newPage: number) {
    let url: string = this.searchResult.value?.previous
      ? this.searchResult.value?.previous
      : this.searchResult.value?.next || '';

    const match = url.match(/([?&])pageNumber=\d+/);

    url = url.replace(/([?&])pageNumber=\d+/, `$1pageNumber=${newPage}`);

    this.currentPage = newPage;

    this.goToPageViaUrl(url);
  }

  get totalPages(): number {
    return this.searchResult.value?.totalPages || 1;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPageViaUrl(this.searchResult.value?.previous!);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPageViaUrl(this.searchResult.value?.next!);
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const totalPages = this.searchResult.value?.totalPages ?? 0;
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
