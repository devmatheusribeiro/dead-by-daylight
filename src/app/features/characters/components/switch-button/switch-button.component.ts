import { CommonModule } from '@angular/common';
import { Component, output, signal, WritableSignal } from '@angular/core';
import { CharacterType } from '../../enums';

@Component({
  selector: 'dbd-switch-button',
  imports: [CommonModule],
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss'
})
export class SwitchButtonComponent {
  onActive = output<CharacterType>()

  protected activeItem: WritableSignal<CharacterType> = signal(CharacterType.ASSASSIN)
  protected characterType = CharacterType

  protected handleCharacter(typeId: CharacterType): void {
    this.activeItem.set(typeId)
    this.onActive.emit(typeId)
  }
}
