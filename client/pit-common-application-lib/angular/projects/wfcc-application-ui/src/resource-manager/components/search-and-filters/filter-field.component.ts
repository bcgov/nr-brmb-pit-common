import { Component, Input } from "@angular/core";

@Component({
    selector: "wf-filter-field",
    template: `
        <mat-label *ngIf="label">{{ label }}</mat-label>
        <div class="field">
            <ng-content></ng-content>
            <div class="sub-label" *ngIf="subLabel">{{ subLabel }}</div>
        </div>
    `,
    styleUrls: [
        "./filter-field.component.scss"
    ],
})
export class WfFilterFieldComponent {
    @Input() label: string;
    @Input() subLabel: string;
}
