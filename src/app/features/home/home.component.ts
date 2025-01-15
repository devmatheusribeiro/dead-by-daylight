import { Component, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../shared/services';
import { SliderComponent } from '../../shared/components';
import { IMaps } from './interface/maps.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dbd-home',
  imports: [RouterModule, SliderComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected data: WritableSignal<IMaps[]> = signal(null)
  protected isLoaded = false

  ngOnInit(): void {
    this.fetchMaps()
  }

  constructor(private contentService: ContentService) { }

  private fetchMaps() {
    this.contentService.fetchData<IMaps[]>('maps')
      .subscribe({
        next: (response) => {
          this.data.set(response)
        },
        complete: () => this.isLoaded = true,
        error: (err) => console.error(err)
      })
  }
}
