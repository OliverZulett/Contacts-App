import { IContact } from './Contact.interface';

export class Contact implements IContact {
    id: string;
    firstName: string;
    firstSurname: string;
    cellPhone: number;
    email: string;
    secondName: string;
    secondSurname: string;
    phone: number;
    adress: string;
    website: string;
    facebook: string;
    twitter: string;
    github: string;
    instagram: string;
    youtube: string;
    notes: string;
    birthday: Date;
    image: string;
    nick: string;

    constructor(
        firstName: string,
        cellPhone: number,
        firstSurname?: string,
        email?: string,
        secondName?: string,
        secondSurname?: string,
        phone?: number,
        adress?: string,
        website?: string,
        facebook?: string,
        twitter?: string,
        github?: string,
        instagram?: string,
        youtube?: string,
        notes?: string,
        birthday?: Date,
        image?: string,
        nick?: string
    ) {
        this.id = Math.floor(Math.random() * (999999999 - 111111111 + 1) + 111111111).toString();
        this.firstName = firstName;
        this.cellPhone = cellPhone;
        this.firstSurname = firstSurname || '';
        this.email = email || '';
        this.secondName = secondName || '';
        this.secondSurname = secondSurname || '';
        this.phone = phone || 0;
        this.adress = adress || '';
        this.website = website || '';
        this.facebook = facebook || '';
        this.twitter = twitter || '';
        this.github = github || '';
        this.instagram = instagram || '';
        this.youtube = youtube || '';
        this.notes = notes || '';
        this.birthday = new Date(1001, 1, 1, 0, 0, 0, 0),
        this.image = image || '';
        this.nick = nick || '';
    }

}
