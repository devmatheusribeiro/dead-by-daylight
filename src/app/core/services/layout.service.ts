import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private logoSubject = new BehaviorSubject<string>('https://ik.imagekit.io/mnbb48o/images/png/icon-logo.png?updatedAt=1736896860148')
  logo$ = this.logoSubject.asObservable()

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateLogoBasedOnRoute()
    })
  }

  private updateLogoBasedOnRoute(): void {
    const currentRoute = this.router.url

    if (currentRoute == '/') {
      this.logoSubject.next('https://ik.imagekit.io/mnbb48o/images/png/icon-logo.png?updatedAt=1736896860148')
    } else {
      this.logoSubject.next('https://ik.imagekit.io/mnbb48o/images/svg/text-logo.svg?updatedAt=1736896859472')
    }
  }
}
