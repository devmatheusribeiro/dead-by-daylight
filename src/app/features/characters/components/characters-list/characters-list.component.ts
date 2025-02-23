import { Component, input, SimpleChanges } from '@angular/core';
import { Characters } from '../../interface/characters.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dbd-characters-list',
  imports: [],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})
export class CharactersListComponent {
  data = input<Characters[]>([])

  ngonChanges(changes: SimpleChanges) {
    console.log(this.data())
  }
}
