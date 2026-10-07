import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-resource-type",
    templateUrl: './base-select.html',
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectResourceTypeComponent extends BaseSelect {
    init() {
        this.title ||= 'Resource Type'
        this.options = this.resourceManagerService.getCodeTable( 'ASSIGN_MEMBER_RSRC_TYPE_CODE' )
    }
}
