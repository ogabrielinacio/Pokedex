import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon; 
  @Output() selectPokemon = new EventEmitter<Pokemon>(); 

  onClick() {
    this.selectPokemon.emit(this.pokemon); 
  }
}
