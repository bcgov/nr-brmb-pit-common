import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-function-qualification-status",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectFunctionQualificationStatusComponent extends BaseSelect {
    init() {
        this.title ||= 'Function Qualification Status'
        this.options = this.resourceManagerService.getCodeTable( 'RESOURCE_CERTIFICATION_CODE' )
    }
}
