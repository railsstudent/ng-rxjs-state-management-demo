import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { TodosStore } from '../stores';

@Component({
    selector: 'todo-search',
    template: `
        <form class="container" [formGroup]="form" novalidate>
            <label class="label">
                Todo Id:
            </label>
            <div class="input-container">
                <input
                    type="text"
                    id="todoInput"
                    placeholder="Search by Todo Id"
                    formControlName="input"
                    [ngClass]="{
                        'error-border': showError
                    }"
                />
                <p *ngIf="showError" class="error">Todo id between 1 and 200 is expected.</p>
            </div>
        </form>
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

            .error-border {
                border: 1px solid red;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSearchComponent implements OnInit {
    showError = false;

    form: FormGroup;

    constructor(private fb: FormBuilder, private todosStore: TodosStore) {}

    private isValidId(id: number) {
        return !Number.isNaN(id) && (id >= 1 && id <= 200);
    }

    private parseTodoId(value: string) {
        const reg = new RegExp('^[0-9]+$');

        if (value === '') {
            return undefined;
        } else if (reg.test(value)) {
            return parseInt(value, 10);
        }
        return Number.NaN;
    }

    ngOnInit() {
        this.form = this.fb.group({
            input: ['', { updateOn: 'blur' }],
        });

        const input = this.form.get('input') as AbstractControl;
        input.valueChanges
            .pipe(
                tap(() => (this.showError = false)),
                map(this.parseTodoId),
                tap(value => {
                    if (typeof value === 'undefined' || this.isValidId(value)) {
                        this.todosStore.setSearch$(value);
                    } else {
                        this.showError = true;
                    }
                }),
            )
            .subscribe(v => console.log(v));
    }
}
