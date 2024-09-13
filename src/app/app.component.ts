import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, CreateButtonComponent, FooterComponent]
})
export class AppComponent {
  title = 'Contacts App';
}
