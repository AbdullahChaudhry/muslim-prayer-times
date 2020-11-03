import { AppComponent } from "./app/app.component";
import { platformBrowserDynamic } from './core';

platformBrowserDynamic()
  .bootstrapComponent(AppComponent)
