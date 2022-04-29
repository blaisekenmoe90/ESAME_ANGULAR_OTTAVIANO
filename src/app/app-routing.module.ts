import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { MessageListComponent } from './components/message-list/message-list.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: '',   redirectTo: '/menu', pathMatch: 'full' },
  {path: 'contacts', component: ContactListComponent},
  {path: 'contact/:id', component: ContactDetailComponent},
  {path: 'whatsapp', component: MessageListComponent},
  {path: 'whatsapp/:userId', component: MessageDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
