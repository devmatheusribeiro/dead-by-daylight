import { Component, input, SimpleChanges } from '@angular/core';
import { ICharacters } from '../../interface/characters.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dbd-characters-list',
  imports: [NgOptimizedImage],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})
export class CharactersListComponent {
  data = input<ICharacters[]>([])

  ngonChanges(changes: SimpleChanges) {
    console.log(this.data())
  }
}
