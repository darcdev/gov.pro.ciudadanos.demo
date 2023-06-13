import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})

/**
 * Service to make HTTP calls
 */
export class TramitesService {
  URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getDatos(numeroRadicado: string) {
    return this.httpClient.get(this.URL + '/ProcessStatus/' + numeroRadicado);
  }

  guardarDatos(body: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );

    return this.httpClient.post(this.URL + '/StartInstancedProcess/TramiteGov', body)
  }

  guardarArchivo(file: File, numeroRadicado: string, nameVariable: string) {

    const formdata = new FormData();
    formdata.append('file', file);

    return this.httpClient.post(this.URL + 'variables/uploadfile/' + numeroRadicado + '/' + nameVariable, formdata).subscribe(
      (response) => {
        console.log(Response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
