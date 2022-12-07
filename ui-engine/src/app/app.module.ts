import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BasicAuthInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScriptEngineComponent } from './script-engine/script-engine.component';
import { UIPageDirective } from './script-engine/ui-page.directive';
import { PaginationComponent } from './_components/datagrid/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { DatagridComponent } from './_components/datagrid/datagrid.component';
import { DropdownComponent } from './_components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginationComponent,
    DatagridComponent,
    DropdownComponent,
    ScriptEngineComponent,
    UIPageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:BasicAuthInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
