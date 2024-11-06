import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, Observable, of } from 'rxjs';
import { OperationResult } from '../models/operation-result.model';
import { CategoryPaginated } from '../models/category-paginated.model';
import { ResultPaginated } from '../models/result-paginated.model';
import { PokemonsContainsInNamePaginated } from '../models/pokemons-contains-in-name-paginated.model';
import { Pokemon } from '../models/pokemon.model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  changeToPage(endpoint: string): Observable<OperationResult<ResultPaginated>> {
    this.loadingService.show();
    return this.http
      .get<OperationResult<ResultPaginated>>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        catchError((error) => {
          return of(error.error as OperationResult<any>);
        }),
         finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getPokemonsByName(
    name: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<OperationResult<Pokemon>> {
    this.loadingService.show();
    let params = new HttpParams();
    params =
      pageNumber !== undefined
        ? params.set('pageNumber', pageNumber.toString())
        : params;
    params =
      pageSize !== undefined
        ? params.set('pageSize', pageSize.toString())
        : params;

    return this.http
      .get<OperationResult<Pokemon>>(`${this.apiUrl}/name/${name}`, { params })
      .pipe(
        catchError((error) => {
          return of(error.error as OperationResult<any>);
        }),
         finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getPokemonsContainsInName(
    name: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<OperationResult<PokemonsContainsInNamePaginated>> {
    this.loadingService.show();
    let params = new HttpParams();
    params = params.set('name', name);
    params =
      pageNumber !== undefined
        ? params.set('pageNumber', pageNumber.toString())
        : params;
    params =
      pageSize !== undefined
        ? params.set('pageSize', pageSize.toString())
        : params;

    return this.http
      .get<OperationResult<PokemonsContainsInNamePaginated>>(
        `${this.apiUrl}/contains-in-name`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error as OperationResult<any>);
        }),
         finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getPokemons(
    pageNumber?: number,
    pageSize?: number
  ): Observable<OperationResult<PokemonsContainsInNamePaginated>> {
    this.loadingService.show();
    let params = new HttpParams();
    params =
      pageNumber !== undefined
        ? params.set('pageNumber', pageNumber.toString())
        : params;
    params =
      pageSize !== undefined
        ? params.set('pageSize', pageSize.toString())
        : params;

    return this.http
      .get<OperationResult<PokemonsContainsInNamePaginated>>(
        `${this.apiUrl}/pokemons`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error as OperationResult<any>);
        }),
         finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getPokemonsByType(
    type: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<OperationResult<CategoryPaginated>> {
    this.loadingService.show();
      let params = new HttpParams();
      params =
        pageNumber !== undefined
          ? params.set('pageNumber', pageNumber.toString())
          : params;
      params =
        pageSize !== undefined
          ? params.set('pageSize', pageSize.toString())
          : params;

      return this.http
        .get<OperationResult<CategoryPaginated>>(`${this.apiUrl}/type/${type}`, {
          params,
        })
        .pipe(
          catchError((error) => {
            return of(error.error as OperationResult<any>);
          }),
         finalize(() => {
          this.loadingService.hide();
        })
        );
    }

    getPokemonsByHabitat(
      habitat: string,
      pageNumber?: number,
      pageSize?: number
    ): Observable<OperationResult<CategoryPaginated>> {
      this.loadingService.show();
    let params = new HttpParams();
    params =
      pageNumber !== undefined
        ? params.set('pageNumber', pageNumber.toString())
        : params;
    params =
      pageSize !== undefined
        ? params.set('pageSize', pageSize.toString())
        : params;

    return this.http
      .get<OperationResult<CategoryPaginated>>(
        `${this.apiUrl}/habitat/${habitat}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error as OperationResult<any>);
        }),
         finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getPokemonsByMultipleFilters(
    name?: string,
    type?: string,
    habitat?: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<OperationResult<ResultPaginated>> {
    this.loadingService.show();
    let params = new HttpParams();
    params = name ? params.set('name', name) : params;
    params = type ? params.set('type', type) : params;
    params = habitat ? params.set('habitat', habitat) : params;
    params =
      pageNumber !== undefined
        ? params.set('pageNumber', pageNumber.toString())
        : params;
    params =
      pageSize !== undefined
        ? params.set('pageSize', pageSize.toString())
        : params;

    return this.http
      .get<OperationResult<ResultPaginated>>(
        `${this.apiUrl}/multiples-filter`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error as OperationResult<any>);
        }),
         finalize(() => {
          this.loadingService.hide();
        })
      );
  }
}
