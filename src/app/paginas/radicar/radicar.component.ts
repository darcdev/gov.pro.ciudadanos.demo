import { Component, OnInit } from "@angular/core";
import { TramitesService } from "src/app/services/tramites.services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NOMBRE_TRAMITE } from "src/app/constants";

@Component({
  selector: "app-radicar",
  templateUrl: "./radicar.component.html",
  styleUrls: ["./radicar.component.css"]
})
export class RadicarComponent implements OnInit {
  NOMBRE_TRAMITE = NOMBRE_TRAMITE;
  etapa: number = 2;
  resultado: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  isSubmited: boolean = false;
  estadoTramite: string = "";
  estadoError: string = "";
  usuarioTramite: string = "";
  formGroup: FormGroup;
  files: any = [];

  constructor(public httpService: TramitesService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      tipo_documento: ["", [Validators.required]],
      numero_identificacion: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      tipo_licencia: ["", [Validators.required]],
      fecha_solicitud: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {}

  //capure the file
  FileDocument(event: any) {
    const file = event.target.files[0];
    this.files[0] = file;
  }
  FileRequest(event: any) {
    const file = event.target.files[0];
    this.files[1] = file;
  }
  FilePlan(event: any) {
    const file = event.target.files[0];
    this.files[2] = file;
  }
  //end capture the file

  async onSubmit() {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isSubmited = true;

    const file1base64 = await this.convertFileToBase64(this.files[0]);
    const file2base64 = await this.convertFileToBase64(this.files[1]);
    const file3base64 = await this.convertFileToBase64(this.files[2]);

    let body: any = {
      variables: {
        numero_identificacion: {
          value: this.formGroup.get("numero_identificacion")?.value,
          type: "string"
        },
        tipo_documento: {
          value: this.formGroup.get("tipo_documento")?.value,
          type: "string"
        },
        nombre: {
          value: this.formGroup.get("nombre")?.value,
          type: "string"
        },
        apellido: {
          value: this.formGroup.get("apellido")?.value,
          type: "string"
        },
        tipo_licencia: {
          value: this.formGroup.get("tipo_licencia")?.value,
          type: "string"
        },
        fecha_solicitud: {
          value: this.formGroup.get("fecha_solicitud")?.value,
          type: "string"
        },
        solicitud : {
          value : file1base64,
          type : 'File',
          valueInfo: {
            filename:  this.files[1].name,
            mimetype: "application/octet-stream",
            encoding: "UTF-8"
          }
        },
        documento : {
          value : file2base64,
          type : 'File',
          valueInfo: {
            filename:  this.files[0].name,
            mimetype: "application/octet-stream",
            encoding: "UTF-8"
          }
        },
        plan : {
          value : file3base64,
          type : 'File',
          valueInfo: {
            filename: this.files[2].name,
            mimetype: "application/octet-stream",
            encoding: "UTF-8"
          }
        }
      }
    };
    console.log(body)
    this.loading = true;
    this.httpService.guardarDatos(body).subscribe(
      (data: any) => {
        this.etapa = 3;
        this.estadoTramite = data.id;
        this.resultado = true;
        this.loading = false;
        this.formGroup.reset();
      },
      error => {
        console.log(error);
        this.etapa = 4;
        this.loading = false;
        this.resultado = false;
        this.error = true;
        console.log(error);
        this.estadoError = "Ocurrió un error al radicar el trámite";
      }
    );
  }

  async convertFileToBase64(file : any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        const base64String = (reader.result as any).toString().split(",")[1]
        resolve(base64String);
      };

      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    });
  }
  async getReportData() {}
}
