import { Component, HostListener, input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { Slider } from './slider.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dbd-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  data = input<Slider[]>([])

  protected isMobile: WritableSignal<boolean> = signal(false);
  protected slideItem: WritableSignal<Slider> = signal(null)
  protected currentIndex = signal(0)
  private maxLength = 0
  private initialX: number = null;
  private initialY: number = null;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile.set(window.innerWidth < 768)
  }

  ngOnInit() {
    this.onResize()
  }

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

  protected handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.initialX = touch.clientX;
    this.initialY = touch.clientY;
  }

  protected handleTouchMove(event: TouchEvent) {
    if (!this.initialX || !this.initialY) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const diffX = this.initialX - currentX;
    const diffY = this.initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.handleNext()
      } else {
        this.handlePrevious()
      }
    }

    this.initialX = null;
    this.initialY = null;
  }

  protected goToSlide(index: number) {
    this.currentIndex.update((current) => {
      const value = index
      return value > this.maxLength ? 0 : value
    })

    const data = this.data()[this.currentIndex()]
    this.slideItem.set(data)
  }

  private setupSlider(data: Slider[]): void {
    this.slideItem.set(data[0])
    this.currentIndex.set(0)
    this.maxLength = data.length - 1
  }
}
