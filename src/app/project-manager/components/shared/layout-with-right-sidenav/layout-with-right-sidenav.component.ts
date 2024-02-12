import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

import { ScreenService } from '@app/services';
@Component({
  selector: 'pm-layout-with-right-sidenav',
  templateUrl: './layout-with-right-sidenav.component.html',
  styleUrls: ['./layout-with-right-sidenav.component.scss'],
})
export class LayoutWithRightSidenavComponent {
  showfilter:boolean = false
  constructor(public screen: ScreenService,private renderer: Renderer2, private el: ElementRef) {}
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    this.showfilter = false
  }
  showfilterhandling(e:Event){
    e.stopPropagation()
    this.showfilter = !this.showfilter
  }
}
