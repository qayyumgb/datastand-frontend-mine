import { Component } from '@angular/core';

import { Usage } from '@app/interfaces';
import { UsageService } from '@app/services';

@Component({
  selector: 'pm-usage-dialog',
  templateUrl: './usage-dialog.component.html',
  styleUrls: ['./usage-dialog.component.scss'],
})
export class UsageDialogComponent {
  usage?: Usage;

  constructor(private usageService: UsageService) {
    this.usageService.getUsage().subscribe((usage) => (this.usage = usage));
  }
}
