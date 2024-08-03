import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-confirm/order.detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import 'localstorage-polyfill'
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AppComponent } from './app/app.component';

global['localStorage'] = localStorage;

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppServerModule {}