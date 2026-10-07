import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-responsible-org-unit",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectResponsibleOrgUnitComponent extends BaseSelect {
    init() {
        this.title ||= 'Responsible Org Unit'
        this.options = this.resourceManagerService.getCodeTable( 'getFCAndFZCodeOptions' )
    }
}
