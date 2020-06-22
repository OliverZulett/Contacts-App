import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/Contact.interface';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: IContact[];

  constructor() {
    this.verifyLocalStorage();
  }

  private verifyLocalStorage(): void {
    if (localStorage.getItem('contacts')) {
      this.loadFromLocalStarage();
    } else {
      this.contacts = [];
    }
  }

  private loadFromLocalStarage(): void {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  ngOnInit(): void {
  }

  sortContacts(): IContact[] {
    return this.contacts = this.contacts.sort((a: IContact, b: IContact) => {
      if  (a.firstName < b.firstName) { return -1; }
      if  (a.firstName > b.firstName) { return 1; }
      return 0;
    });
  }

}
