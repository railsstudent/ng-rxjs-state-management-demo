import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosStore } from '../stores';

@Component({
    selector: 'todo-search',
    template: `
        <div class="container">
            <label class="label">
                Todo Id:
            </label>
            <div class="input-container">
                <input type="text" id="todoInput" placeholder="Search by Todo Id" (change)="change($event.target)" />
                <p *ngIf="showError" class="error">Todo id between 1 and 200 is expected.</p>
            </div>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            .container {
                display: flex;
            }

            .label {
                padding-left: 15px;
                padding-right: 15px;
                padding-top: calc(0.375rem + 1px);
            }
            .input-container {
                flex-grow: 1;
                padding-right: 1rem;
            }

            .input-container > input {
                width: 100%;
                padding: 0.375rem 0.75rem;
                border-radius: 5px;
                font-size: 1em;
            }

            .error {
                color: red;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSearchComponent {
    showError = false;

    constructor(private todosStore: TodosStore) {}

    change({ value }) {
        this.showError = false;
        console.log('value', value);
        if (value === '') {
            this.todosStore.setSearch$(undefined);
            return;
        }
        const id = parseInt(value, 10);
        if (Number.isNaN(id)) {
            this.showError = true;
        } else if (id < 1 || id > 200) {
            this.showError = true;
        } else {
            this.todosStore.setSearch$(id);
        }
    }
}
