import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-approval-status-code",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectApprovalStatusCodeComponent extends BaseSelect {
    init() {
        this.title ||= 'Approval Status'
        this.options = this.resourceManagerService.getCodeTable( "SUPP_RSRC_REVIEW_STATUS_CODE" )
        this.multi ??= true
    }
}
