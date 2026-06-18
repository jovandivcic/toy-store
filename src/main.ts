import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// @ts-ignore: Ignore missing type declarations for CSS side-effect import
import '@fortawesome/fontawesome-free/css/all.css';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
