import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'dbd-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected logoUrl: string = '';

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.logo$.subscribe((logoUrl: string) => {
      this.logoUrl = logoUrl;
    });
  }
}
