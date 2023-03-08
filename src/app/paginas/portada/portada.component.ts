import { Component, OnInit } from '@angular/core';
import {NOMBRE_TRAMITE} from '../../constants'
@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {
  NOMBRE_TRAMITE = NOMBRE_TRAMITE;
  constructor() { }

  ngOnInit(): void {
  }

}
