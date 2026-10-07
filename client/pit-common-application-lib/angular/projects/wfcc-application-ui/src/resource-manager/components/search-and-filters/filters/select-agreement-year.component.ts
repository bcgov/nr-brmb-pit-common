import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-agreement-year",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectAgreementYearComponent extends BaseSelect {
    init() {
        this.title ||= 'Agreement Year'
        this.options = this.resourceManagerService.getCodeTable( "FIRE_YEARS" )
    }
}
