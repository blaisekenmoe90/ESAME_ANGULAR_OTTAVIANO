import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { environment } from 'src/environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/inMemoryDataService/in-memory-data.service';
import { MenuComponent } from './components/menu/menu.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 1000 }
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
