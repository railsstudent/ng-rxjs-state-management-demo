import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'State management demo in RxJS';

    constructor(titleService: Title) {
        titleService.setTitle('State management in RxJS');
    }
}
