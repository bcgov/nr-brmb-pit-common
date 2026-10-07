import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-resource-status-code",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectResourceStatusCodeComponent extends BaseSelect {
    init() {
        this.title ||= 'Active Status'
        this.options = this.resourceManagerService.getCodeTable( "SUPPLIER_RESOURCE_STATUS_CODE" )
    }
}
