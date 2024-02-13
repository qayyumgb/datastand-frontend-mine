import { Component, Input } from '@angular/core';

@Component({
  selector: 'pm-tag-list-truncated',
  templateUrl: './tag-list-truncated.component.html',
  styleUrls: ['./tag-list-truncated.component.scss'],
})
export class TagListTruncatedComponent {
  @Input() tags?: string[];
 constructor(){

 }
  
}
