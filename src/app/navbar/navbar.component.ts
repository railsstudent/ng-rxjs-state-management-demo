import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    template: `
        <ul class="menu">
            <li class="menu-item" (click)="navigate([''])">Posts</li>
            <li class="menu-item" (click)="navigate(['todos'])">Todos</li>
        </ul>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            ul.menu {
                display: flex;
                padding: 1rem;
                background: rebeccapurple;
                list-style-type: none;
            }

            li.menu-item {
                color: white;
                margin-right: 1rem;
                font-size: 1rem;
                text-decoration: underline;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    navigate(paths: string[]) {
        this.router.navigate(paths);
    }
}
