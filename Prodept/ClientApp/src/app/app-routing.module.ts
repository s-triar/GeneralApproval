import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CounterComponent } from "./lama/counter/counter.component";
import { FetchDataComponent } from "./lama/fetch-data/fetch-data.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ForgetPasswordComponent } from "./pages/auth/forget-password/forget-password.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { DevNavComponent } from "./dev-nav/dev-nav.component";

const routes: Routes = [
  {
    path: "",
    component: MainNavComponent,
    children: [
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forget-password", component: ForgetPasswordComponent },
    ],
  },
  {
    path: "dev",
    component: DevNavComponent,
    children: [
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forget-password", component: ForgetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
