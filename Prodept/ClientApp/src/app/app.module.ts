import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./lama/nav-menu/nav-menu.component";
import { HomeComponent } from "./lama/home/home.component";
import { CounterComponent } from "./lama/counter/counter.component";
import { FetchDataComponent } from "./lama/fetch-data/fetch-data.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";

import { NgxsModule } from "@ngxs/store";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";

import { MainNavComponent } from "./main-nav/main-nav.component";
import { DevNavComponent } from "./dev-nav/dev-nav.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ForgetPasswordComponent } from "./pages/auth/forget-password/forget-password.component";
import { UserSideNavComponent } from "./components/user-side-nav/user-side-nav.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MainNavComponent,
    DevNavComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    UserSideNavComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([]),
    NgxsStoragePluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
