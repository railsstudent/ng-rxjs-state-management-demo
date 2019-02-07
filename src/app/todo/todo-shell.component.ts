import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'todo-shell',
    template: `
        <todo-search></todo-search>
        <todo-list></todo-list>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            todo-search {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoShellComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
