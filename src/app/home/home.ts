
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule, RouterModule],
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class Home { }
