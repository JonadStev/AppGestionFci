// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl: 'http://localhost:8080/auth/',
  gestionUsuarioUrl: 'http://localhost:8080/gestion/usuario/',
  gestionEstadoUrl: 'http://localhost:8080/gestion/estado/',
  gestionLineaUrl: 'http://localhost:8080/gestion/linea/',
  gestionSubLineaUrl: 'http://localhost:8080/gestion/sublinea/',
  gestionUnescoUrl: 'http://localhost:8080/gestion/unesco/',
  gestionCarreraUrl: 'http://localhost:8080/gestion/carrera/',
  gestionProductoUrl: 'http://localhost:8080/gestion/producto/',

  procesosProyecto: 'http://localhost:8080/gestion/proyecto/',
  procesosHoras: 'http://localhost:8080/gestion/horas/',
  procesosAcreditacion: 'http://localhost:8080/gestion/acreditacion/',
  procesosMonitoreo: 'http://localhost:8080/gestion/monitoreo/',

  cuentaUrl: 'http://localhost:8080/cuenta/',
  bloqueUrl: 'http://localhost:8080/bloque/',
  dashboardUrl: 'http://localhost:8080/dashboard/',
  userUrl: 'http://localhost:8080/usuario/',
  bloqueoUrl: 'http://localhost:8080/bloqueo/',
  mantenimientoUrl: 'http://localhost:8080/mantenimientos/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
