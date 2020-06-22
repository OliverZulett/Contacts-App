import { Component, OnInit, Input } from '@angular/core';
import { IContact } from '../../models/Contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() {
    console.log(this.contact);
    
  }

  ngOnInit(): void {
  }

}
