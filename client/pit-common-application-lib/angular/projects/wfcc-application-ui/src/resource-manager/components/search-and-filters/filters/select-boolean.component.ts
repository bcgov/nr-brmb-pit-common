import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-boolean",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectBooleanComponent extends BaseSelect {
    @Input() trueLabel = 'Yes'
    @Input() falseLabel = 'No'

    init() {
        this.title ||= 'Boolean'
        this.options = [
            {
                code: 'false',
                description: this.falseLabel
            },
            {
                code: 'true',
                description: this.trueLabel
            }
        ]
    }
}
