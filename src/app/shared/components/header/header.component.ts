import { Component, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { ILogo } from './logo.interface';

@Component({
  selector: 'dbd-header',
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected isTextLogo: WritableSignal<boolean> = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
     this.isTextLogo.set(this.router.url != '/')
    })
  }
}
