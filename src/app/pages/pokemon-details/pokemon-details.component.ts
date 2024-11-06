import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  pokemon: Pokemon | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonApiService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const pokemonName = this.activatedRoute.snapshot.paramMap.get('name');
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['pokemon']) {
      this.pokemon = navigation.extras.state['pokemon'];
    } else {
      if (pokemonName) {
        this.pokemonService
          .getPokemonsByName(pokemonName)
          .subscribe((response) => {
            this.pokemon = response.value;
          });
      }
    }
  }
}
