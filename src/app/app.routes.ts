import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./explorador/explorador.component').then(m => m.ExploradorComponent),
    children:[
      {
        path: '',
        title: '',
        loadComponent: () => import('./explorador/inicio-explorador/inicio-creador.component').then(m => m.InicioCreadorComponent),
      },
      {
        path: 'ksdflsd',
        title: 'Explorar Recetas',
        loadComponent: () => import('./explorador/explorar-receta/explorar-receta.component').then(m => m.ExplorarRecetaComponent),
      },
      {
        path: 'iniciarSesion',
        title: 'Iniciar Sesion',
        loadComponent: () => import('./explorador/iniciar-sesion/iniciar-sesion.component').then(m => m.IniciarSesionComponent),
      },
      {
        path: 'cocinaTuCuenta',
        title: 'Cocina Tu Cuenta',
        loadComponent: () => import('./explorador/crear-cuenta/crear-cuenta.component').then(m => m.CrearCuentaComponent),
      },
      {
        path: 'inicio-categorias',
        title: 'Inicio',
        loadComponent: () => import('./explorador/inicio-explorador/inicio-creador.component').then(m => m.InicioCreadorComponent),
      }
    ]
  },
  {
    path: 'ingresar',
    canActivate: [AuthGuard],

    loadComponent: () => import('./creador/creador.component').then(m => m.CreadorComponent),
    children:[
      {
        path: '',
        title: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./creador/gestionar-receta-creador/gestionar-receta-creador.component').then(m => m.GestionarRecetaCreadorComponent),
      },
      {
        path: 'gestionDeRecetas',
        title: 'Gestion De Recetas',
        canActivate: [AuthGuard],
        loadComponent: () => import('./creador/gestionar-receta-creador/gestionar-receta-creador.component').then(m => m.GestionarRecetaCreadorComponent),
      },
      {
        path: 'miPerfil',
        title: 'Mi Perfil',
        canActivate: [AuthGuard],
        loadComponent: () => import('./creador/perfil-creador/perfil-creador.component').then(m => m.PerfilCreadorComponent),
      },
      {
        path: 'crearReceta',
        title: 'Crear Receta',
        canActivate: [AuthGuard],
        loadComponent: () => import('./creador/crear-receta-creador/crear-receta-creador.component').then(m => m.CrearRecetaCreadorComponent),
      }
    ]
  },
  {
    path: 'categoria',
    loadComponent: () => import('./categorias/categorias.component').then(m => m.CategoriasComponent),
    children:[
      {
        path: '',
        title: '',
        loadComponent: () => import('./categorias/inicio-categorias/inicio.component').then(m => m.InicioCategoriasComponent),
      },
      {
        path: 'desayuno',
        title: 'Desayuno',
        loadComponent: () => import('./categorias/desayuno/desayuno.component').then(m => m.DesayunoComponent),
      },
      {
        path: 'almuerzo',
        title: 'Almuerzo',
        loadComponent: () => import('./categorias/almuerzo/almuerzo.component').then(m => m.AlmuerzoComponent),
      },
      {
        path: 'cena',
        title: 'Cena',
        loadComponent: () => import('./categorias/cena/cena.component').then(m => m.CenaComponent),
      },
      {
        path: 'postres',
        title: 'Postres',
        loadComponent: () => import('./categorias/postres/postres.component').then(m => m.PostresComponent),
      }
      ,
      {
        path: 'superavit',
        title: 'Superavit',
        loadComponent: () => import('./categorias/superavit/superavit.component').then(m => m.SuperavitComponent),
      }
      ,
      {
        path: 'deficit',
        title: 'Deficit',
        loadComponent: () => import('./categorias/deficit/deficit.component').then(m => m.DeficitComponent),
      }
      ,
      {
        path: 'cardBody/:id',
        title: 'CardBody Id',
        loadComponent: () => import('./categorias/card-body/card-body.component').then(m => m.CardBodyComponent),
      }
    ]
  },
  {
    path: 'verificar/:token',
    loadComponent: () => import('./creador/verify-account/verify-account.component'),
  },
  {
    path: 'cardBody2/:id',
    loadComponent: () => import('./card-new/card-new.component').then(m => m.CardNewComponent),
    children:[
      {
        path: '',
        title: '',
        loadComponent: () => import('./card-new/card-body2/card-body2.component').then(m => m.CardBody2Component),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/explorador',
    pathMatch: 'full'
  }

];
