import { Component, OnInit } from '@angular/core';
import { IContact } from '../../models/Contact.interface';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formatDate, NgIf } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class ContactComponent implements OnInit {

  id: Observable<string>;
  contact: IContact;
  contacts: IContact[];
  formContact: FormGroup;

  // validadores
  firstNameValidator: boolean;

  constructor(private router: ActivatedRoute) {
    this.setId();
    this.loadContacts();
    this.loadContact();
    this.buildForm();
    // validadores
    this.firstNameValidator = true;
  }

  updateContact(): void {
    console.log(this.formContact);
    this.contact = { ...this.contact, ...this.formContact.value.personalData };
    this.contact = { ...this.contact, ...this.formContact.value.rrss };
    this.contact = { ...this.contact, ...this.formContact.value.extraData };
    const index: number = this.contacts.findIndex(contact => contact.id === this.contact.id);
    this.contacts[index] = this.contact;
    this.saveContactsToLocalStorage();
    // console.log(this.contact);
    // console.log(this.contacts);
  }

  ngOnInit(): void {
  }

  private setId(): void {
    this.id = this.router.params.pipe(map(p => p.id));
  }

  private loadContact(): void {
    this.id.subscribe(id => {
      this.contact = this.contacts.find(contact => contact.id === id);
      console.log(this.contact);
    });

  }

  private loadContacts(): void {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  private buildForm(): void {
    this.formContact = new FormGroup({

      personalData: new FormGroup({
        firstName: new FormControl(
          this.contact.firstName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+'),
            this.firstNameValidatorMessage
          ]
        ),
        secondName: new FormControl(
          this.contact.secondName,
          [
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        firstSurname: new FormControl(
          this.contact.firstSurname,
          [
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        secondSurname: new FormControl(
          this.contact.secondSurname,
          [
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        cellPhone: new FormControl(
          this.contact.cellPhone,
          [
            Validators.minLength(7),
            Validators.maxLength(8)
          ]
        ),
        email: new FormControl(
          this.contact.email,
          Validators.pattern('[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ),
        phone: new FormControl(
          this.contact.phone === 0 ? '' : this.contact.phone,
          [
            Validators.minLength(7),
            Validators.maxLength(8)
          ]
        ),
        adress: new FormControl(
          this.contact.adress
        )
      }),
      rrss: new FormGroup({
        website: new FormControl(
          this.contact.website,
          Validators.pattern('^(http|https):\/\/[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+$')
        ),
        facebook: new FormControl(
          this.contact.facebook,
          this.invalidFacebookLink
        ),
        twitter: new FormControl(
          this.contact.twitter,
          this.invalidTwitterLink
        ),
        github: new FormControl(
          this.contact.github,
          this.invalidGithubLink
        ),
        instagram: new FormControl(
          this.contact.instagram,
          this.invalidInstagramLink
        ),
        youtube: new FormControl(
          this.contact.youtube,
          this.invalidYoutubeLink
        ),
      }),
      extraData: new FormGroup({
        image: new FormControl(
          this.contact.image
        ),
        nick: new FormControl(
          this.contact.nick,
        ),
        birthday: new FormControl(
          !this.birthdayCompare() ? '' : formatDate(this.contact.birthday, 'yyyy-MM-dd', 'en'),
          [Validators.required]
        ),
        notes: new FormControl(
          this.contact.notes
        )
      })
    });

  }

  private saveContactsToLocalStorage(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  private firstNameValidatorMessage( firstName: FormControl ): {[s: string]: boolean} {
    console.log(firstName);
    return null;
  }

  private invalidFacebookLink( facebookLink: FormControl ): {[s: string]: boolean} {
    const linkForValidate: string = facebookLink.value || '';
    if (!linkForValidate.includes('https://www.facebook.com/') && linkForValidate.length > 0) {
      return {
        invalidFacebookLink: true
      };
    }
    return null;
  }

  private invalidTwitterLink( twitterLink: FormControl ): {[s: string]: boolean} {
    const linkForValidate: string = twitterLink.value || '';
    if (!linkForValidate.includes('https://twitter.com/') && linkForValidate.length > 0) {
      return {
        invalidTwitterLink: true
      };
    }
    return null;
  }

  private invalidGithubLink( githubLink: FormControl ): {[s: string]: boolean} {
    const linkForValidate: string = githubLink.value || '';
    if (!linkForValidate.includes('https://github.com/') && linkForValidate.length > 0) {
      return {
        invalidGithubLink: true
      };
    }
    return null;
  }

  private invalidInstagramLink( instagramLink: FormControl ): {[s: string]: boolean} {
    const linkForValidate: string = instagramLink.value || '';
    if (!linkForValidate.includes('https://www.instagram.com/') && linkForValidate.length > 0) {
      return {
        invalidInstagramLink: true
      };
    }
    return null;
  }

  private invalidYoutubeLink( youtubeLink: FormControl ): {[s: string]: boolean} {
    const linkForValidate: string = youtubeLink.value || '';
    if (!linkForValidate.includes('https://www.youtube.com/') && linkForValidate.length > 0) {
      return {
        invalidYotubeLink: true
      };
    }
    return null;
  }

  private birthdayCompare(): boolean {
    const year = new Date( this.contact.birthday);
    if (year.getFullYear() === 1001) {
      return false;
    }
    return true;
  }

}
