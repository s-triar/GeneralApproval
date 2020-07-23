import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { UserSideNavComponent } from './components/user-side-nav/user-side-nav.component';
import { CardHoverDirective } from './directives/card-hover.directive';
import { ChangeIconOnHoverDirective } from './directives/change-icon-on-hover.directive';
import { OpenSidebarOnSwipeDirective } from './directives/open-sidenav-on-swipe.directive';
import { RolesDirective } from './directives/roles.directive';
import { ListComponent } from './pages/list/list.component';
import { GeneratorListComponent } from './components/generator-list/generator-list.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { DataTabComponent } from './components/data-tab/data-tab.component';
import { DetailComponent } from './pages/detail/detail.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormTextBoxComponent } from './components/form-text-box/form-text-box.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormTableComponent } from './components/form-table/form-table.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { FormFileComponent } from './components/form-file/form-file.component';
import { GeneratorDetailComponent } from './components/generator-detail/generator-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SnackbarNotifComponent } from './components/snackbar-notif/snackbar-notif.component';
import { DialogLoadingComponent } from './components/dialog-loading/dialog-loading.component';
import { ApprovalConfirmationComponent } from './components/approval-confirmation/approval-confirmation.component';
import { ApprovalWarningComponent } from './components/approval-warning/approval-warning.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { interceptorProviders } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    UserSideNavComponent,
    CardHoverDirective,
    ChangeIconOnHoverDirective,
    OpenSidebarOnSwipeDirective,
    RolesDirective,
    ListComponent,
    GeneratorListComponent,
    DataListComponent,
    DataTabComponent,
    DetailComponent,
    FormInputComponent,
    FormTextBoxComponent,
    FormListComponent,
    FormTableComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormDateComponent,
    FormFileComponent,
    GeneratorDetailComponent,
    SnackbarNotifComponent,
    DialogLoadingComponent,
    DashboardComponent,
    ApprovalConfirmationComponent,
    ApprovalWarningComponent,
  ],
  entryComponents: [
    SnackbarNotifComponent,
    DialogLoadingComponent,
    GeneratorListComponent,
    DataListComponent,
    DataTabComponent,
    GeneratorDetailComponent,
    FormInputComponent,
    FormTextBoxComponent,
    FormListComponent,
    FormTableComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormDateComponent,
    FormFileComponent,
    ApprovalConfirmationComponent,
    ApprovalWarningComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [...interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
