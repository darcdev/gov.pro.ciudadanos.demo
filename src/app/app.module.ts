import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*	-------------------------------------------	*\ 
/*	COMPONENTES PROPIOS 
/*	-------------------------------------------	*/
import { HeaderComponent } from './plantillas/header/header.component';
import { MigaPanComponent } from './plantillas/miga-pan/miga-pan.component';
import { AccionesComponent } from './plantillas/acciones/acciones.component';
import { AreaServicioComponent } from './plantillas/area-servicio/area-servicio.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { RetroalimentacionFooterComponent } from './plantillas/retroalimentacion-footer/retroalimentacion-footer.component';
import { EtapasComponent } from './plantillas/etapas/etapas.component';

import { PortadaComponent } from './paginas/portada/portada.component';

/*	-------------------------------------------	*\ 
/*	PIPES 
/*	-------------------------------------------	*/

import { cortarCaracteresthPipe } from './pipes/cortar-caracteres.pipe';
import { ConsultarComponent } from './paginas/consultar/consultar.component';
import { RadicarComponent } from './paginas/radicar/radicar.component';
import { FileInputComponent } from './plantillas/componentes/file-input/file-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MigaPanComponent,
    AccionesComponent,
    AreaServicioComponent,
    FooterComponent,
    RetroalimentacionFooterComponent,
    EtapasComponent,
    PortadaComponent,
    cortarCaracteresthPipe,
    ConsultarComponent,
    RadicarComponent,
    FileInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
