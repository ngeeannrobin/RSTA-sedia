import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BiboComponent } from './bibo/bibo.component';
import { ChangeRankNameComponent } from './change-rank-name/change-rank-name.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { ScannerComponent } from './scanner/scanner.component';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../secret';

// PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// QR Code
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// Misc
import { FormsModule } from '@angular/forms';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginEmailComponent } from './login-email/login-email.component';
import { BiboInputCodeComponent } from './bibo-input-code/bibo-input-code.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ChangeDateComponent } from './change-date/change-date.component';
import { MessageComponent } from './message/message.component';
import { ViewCoyBiboComponent } from './view-coy-bibo/view-coy-bibo.component';
import { ParadeStateComponent } from './parade-state/parade-state.component';
import { SelectPersonComponent } from './select-person/select-person.component';
import { TemperatureTrackingComponent } from './temperature-tracking/temperature-tracking.component';
import { AdminBiboComponent } from './admin-bibo/admin-bibo.component';
import { SelectPltComponent } from './select-plt/select-plt.component';
import { CodeComponent } from './code/code.component';
import { ELanyardComponent } from './e-lanyard/e-lanyard.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScannerComponent,
    BiboComponent,
    MenuComponent,
    ProfileComponent,
    ChangeRankNameComponent,
    QrcodeComponent,
    LoginEmailComponent,
    BiboInputCodeComponent,
    NavBarComponent,
    AdminMenuComponent,
    ViewCoyBiboComponent,
    ChangeDateComponent,
    MessageComponent,
    ParadeStateComponent,
    SelectPersonComponent,
    TemperatureTrackingComponent,
    AdminBiboComponent,
    SelectPltComponent,
    CodeComponent,
    ELanyardComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
