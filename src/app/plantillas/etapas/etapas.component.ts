import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css'],
})
export class EtapasComponent  {
  @Input() etapa: number = 2;

  constructor(private route: ActivatedRoute) {}

}
