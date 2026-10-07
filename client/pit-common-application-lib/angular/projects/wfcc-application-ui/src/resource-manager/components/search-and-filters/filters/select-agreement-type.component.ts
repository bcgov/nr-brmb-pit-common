import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-agreement-type",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectAgreementTypeComponent extends BaseSelect {
    init() {
        this.title ||= 'Agreement Type'
        this.options = this.resourceManagerService.getCodeTable( "AGREEMENT_TYPE_CODE" )
    }
}
