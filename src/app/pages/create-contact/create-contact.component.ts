import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IContact } from '../../models/Contact.interface';
import { Contact } from '../../models/Contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  contact: IContact;
  contacts: IContact[];

  constructor( private router: Router ) {
    this.verifyLocalStorage();
  }

  ngOnInit(): void {
  }

  save( CreateUserForm: NgForm ) {
    console.log(CreateUserForm);
    console.log(CreateUserForm.value);

    const newContact: IContact = CreateUserForm.value;

    if (CreateUserForm.valid) {
      this.contact = new Contact(
        newContact.firstName,
        newContact.cellPhone,
        newContact.firstSurname,
        newContact.email
      );
      console.log('nuevo contacto creado: ', this.contact);
      this.contacts.push(this.contact);
      this.saveToLocalStorage();
      this.router.navigate(['/Lista']);
    } else {
      Object.values( CreateUserForm.controls ).forEach( control => {
        control.markAsTouched();
      });
      console.log('los datos no son validos');
    }

  }

  saveContact() {
    let contacts: IContact[];
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  private saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  private verifyLocalStorage() {
    if (localStorage.getItem('contacts')) {
      this.loadFromLocalStarage();
    } else {
      this.contacts = [];
    }
  }

  private loadFromLocalStarage() {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }

}
