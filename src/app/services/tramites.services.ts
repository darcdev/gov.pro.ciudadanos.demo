import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Service to make HTTP calls
 */
export class TramitesService {
  URL = 'https://localhost:7030/api/';

  constructor(private httpClient: HttpClient) {}

  getDatos(numeroRadicado: string) {
    return this.httpClient.get(this.URL + 'ProcessStatus/' + numeroRadicado, {
      responseType: 'text',
    });
  }

  guardarDatos(body: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );

    return this.httpClient.post(this.URL + 'StartProcess/', body, {      
      responseType: 'text',
    });
  }
}
