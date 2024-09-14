import { Routes } from '@angular/router';

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
        path: 'explorarRecetas',
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
    loadComponent: () => import('./creador/creador.component').then(m => m.CreadorComponent),
    children:[
      {
        path: '',
        title: '',
        loadComponent: () => import('./creador/gestionar-receta-creador/gestionar-receta-creador.component').then(m => m.GestionarRecetaCreadorComponent),
      },
      {
        path: 'gestionDeRecetas',
        title: 'Gestion De Recetas',
        loadComponent: () => import('./creador/gestionar-receta-creador/gestionar-receta-creador.component').then(m => m.GestionarRecetaCreadorComponent),
      },
      {
        path: 'miPerfil',
        title: 'Mi Perfil',
        loadComponent: () => import('./creador/perfil-creador/perfil-creador.component').then(m => m.PerfilCreadorComponent),
      },
      {
        path: 'crearReceta',
        title: 'Crear Receta',
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
        title: 'Inicio',
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
        loadComponent: () => import('./categorias/categorias.component').then(m => m.CategoriasComponent),
      }
    ]
  },
  {
    path: 'verificar/:token',
    loadComponent: () => import('./creador/verify-account/verify-account.component'),
  },
  {
    path: '**',
    redirectTo: '/explorador',
    pathMatch: 'full'
  }
];