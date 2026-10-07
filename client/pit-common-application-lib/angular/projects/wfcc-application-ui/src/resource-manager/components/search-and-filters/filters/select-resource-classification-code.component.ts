import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-resource-classification-code",
    templateUrl: './base-select.html',
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectResourceClassificationCodeComponent extends BaseSelect {
    init() {
        this.title ||= 'Resource Classification'
        this.options = this.resourceManagerService.getCodeTable( 'getFunctionsAndResourceClassifications' )
        this.multi ??= true
        this.maxSelect ??= 3
    }
}
