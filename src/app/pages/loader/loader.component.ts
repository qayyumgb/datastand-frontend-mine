import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loader: boolean = false

  constructor(private ld: LoaderService) {

  }
  ngOnInit(): void {
    this.ld.showLoader.subscribe(d => this.loader = d)
  }

}
