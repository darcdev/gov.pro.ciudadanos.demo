import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {NOMBRE_TRAMITE} from '../../constants';
@Component({
  selector: 'app-miga-pan',
  templateUrl: './miga-pan.component.html',
  styleUrls: ['./miga-pan.component.css']
})
export class MigaPanComponent implements OnInit {
  public NOMBRE_TRAMITE = NOMBRE_TRAMITE;
  public accion="";
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(params => {
      console.log(params);
      this.accion = params['accion'] ? params['accion']:"";
    });
  }

}
