import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaveapdetailsComponent } from './saveapdetails/saveapdetails.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/services/login.service';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { PayComponent } from './pay/pay.component';
import { CreditCardDirective } from './pay/CreditCardDirective';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    SaveapdetailsComponent,
    EditComponent,
    HomeComponent,
    MainComponent,
    LoginComponent,
    ForgotpwdComponent,
    RegistrationComponent,
    ComplaintComponent,
    PayComponent,
    CreditCardDirective,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:3000
    }),
    NgSelectModule,
  
  ],
  providers: [LoginService,AuthGuard,[{ provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
