import { Component, OnInit } from '@angular/core';

import { TramitesService } from 'src/app/services/tramites.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NOMBRE_TRAMITE } from 'src/app/constants';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
})
export class ConsultarComponent implements OnInit {
  NOMBRE_TRAMITE = NOMBRE_TRAMITE;
  etapa: number = 2;
  resultado: boolean = false;
  loading: boolean = false;

  estadoTramite: string = '';
  rutaPDF: string = '';
  usuarioTramite: string = '';
  formGroup: FormGroup;

  constructor(public httpService: TramitesService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      numero_radicado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.formGroup.reset;
    this.etapa = 2;
    this.resultado = false;
    this.formGroup.controls['numero_radicado'].setValue('');
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.rutaPDF = '';

    this.loading = true;
    this.httpService
      .getDatos(this.formGroup.get('numero_radicado')?.value)
      .subscribe(
        (data: any) => {
          if (data.state === 'ACTIVE') {
            this.etapa = 3;
            this.estadoTramite =
              "Su trámite se encuentra en proceso aún, en el estado de '" +
              data.activityName +
              "'";
          } else if (data.state === 'COMPLETED') {
            this.etapa = 4;
            this.estadoTramite = 'El proceso ha culminado exitosamente'
            this.rutaPDF = data.message
          }

          this.resultado = true;
          this.loading = false;
        },
        (error) => {
          this.etapa = 4;
          this.loading = false;
          this.resultado = true;
          this.estadoTramite = 'No se encontró el resultado';
          console.log('Ocurrió un error:', error);
        }
      );
  }

  async getReportData() {}
}
