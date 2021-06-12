import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

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
import { ScannerComponent } from './scanner/scanner.component';
import { BiboComponent } from './bibo/bibo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScannerComponent,
    BiboComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
