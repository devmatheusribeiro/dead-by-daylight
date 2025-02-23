import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { SwitchButtonComponent, SearchInputComponent, CharactersListComponent } from './components';
import { ContentService } from '../../shared/services';
import { Characters } from './interface/characters.interface';
import { CharacterType } from './enums';
import { CHARACTER_CONFIG, CharacterConfig } from './configurations/charactes.config';
import { FormsModule } from '@angular/forms';
import { debounce } from '../../shared/decorators';

@Component({
  selector: 'dbd-characters',
  imports: [CommonModule, FormsModule, SwitchButtonComponent, SearchInputComponent, CharactersListComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  protected data: WritableSignal<Characters[]> = signal([])
  protected itemActive: WritableSignal<CharacterType> = signal(CharacterType.ASSASSIN)
  protected config: { [key: string]: CharacterConfig } = CHARACTER_CONFIG
  protected search: string = ''
  protected characterType = CharacterType
  protected svgColor: WritableSignal<string> = signal('#0866B0')
  protected isLoaded = false

  private baseData: Characters[] = []

  ngOnInit(): void {
    this.fetchMaps(CharacterType.ASSASSIN)
  }

  constructor(private contentService: ContentService) { }

  protected fetchMaps(itemActive: CharacterType): void {
    this.itemActive.set(itemActive)
    this.svgColor.set(itemActive == CharacterType.ASSASSIN ?  '#80080A' : '#0866B0')
    this.isLoaded = false

    this.contentService.fetchData<Characters[]>('characters', { role: itemActive })
      .subscribe({
        next: (response) => {
          this.baseData = response
          this.data.set(this.baseData)
        },
        complete: () => this.isLoaded = true,
        error: (err) => console.error(err)
      })
  }

  @debounce(300)
  protected fetchCharacters(search: string): void {
    if (!search || search.length < 1) {
      this.data.set(this.baseData)
      return
    }

    const filteredData = this.baseData.filter(c =>
      c.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

    this.data.set(filteredData)
  }
}
