import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './paginas/consultar/consultar.component';
import { PortadaComponent } from './paginas/portada/portada.component';
import { RadicarComponent } from './paginas/radicar/radicar.component';




const routes: Routes = [
  {
    path: 'radicar', component: RadicarComponent,
    data: { 
      etapa:2,
      accion:"Radicar trámite"
    }
  },
  {
    path: 'consultar', component: ConsultarComponent,
    data: { 
      etapa:2,
      accion:"Consultar trámite"
    }
  },
  {
    path: '', component: PortadaComponent,
    data: { 
      etapa:2,
    },
  }
    
 
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
