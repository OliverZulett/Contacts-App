import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [RouterLink, FormsModule]
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['/Lista']);
  }

}
