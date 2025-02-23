import { Component, input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ISlider } from './slider.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dbd-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  data = input<ISlider[]>([])

  protected slideItem: WritableSignal<ISlider> = signal(null)
  protected currentIndex = signal(0)
  private maxLength = 0

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data().length > 0) {
      this.setupSlider(this.data());
    }
  }

  protected handlePrevious(): void {
    this.currentIndex.update((current) => {
      const value = current - 1
      return value < 0 ? this.maxLength : value
    })

    const data = this.data()[this.currentIndex()]
    this.slideItem.set(data)
  }

  protected handleNext(): void {
    this.currentIndex.update((current) => {
      const value = current + 1
      return value > this.maxLength ? 0 : value
    })

    const data = this.data()[this.currentIndex()]
    this.slideItem.set(data)
  }

  private setupSlider(data: ISlider[]): void {
    this.slideItem.set(data[0])
    this.currentIndex.set(0)
    this.maxLength = data.length - 1
  }
}
