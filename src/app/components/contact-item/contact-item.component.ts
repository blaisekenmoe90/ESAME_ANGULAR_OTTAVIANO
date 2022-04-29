import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  
  // questa è la variabile a cui si riferisce il property binding del 
  // contact-list.component.html 
  @Input() contact!: Contact;
    
  constructor() { }

  ngOnInit(): void {
    console.log(this.contact?.firstname)
  }

}
