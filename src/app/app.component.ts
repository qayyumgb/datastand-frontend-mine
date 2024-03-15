import { Component, HostListener } from '@angular/core';

/** Returns true if the given width is a big screen.
 * @param width Width to check.
 */
function isBigScreenFn(width: number): boolean {
  return width >= 900;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  public isBigScreen?: boolean;

  constructor() {}

  ngOnInit() {
    this.isBigScreen = isBigScreenFn(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isBigScreen = isBigScreenFn(window.innerWidth);
  }
}
