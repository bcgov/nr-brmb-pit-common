import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-supplier-status-code",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectSupplierStatusCodeComponent extends BaseSelect {
    init() {
        this.title ||= 'Active Status'
        this.options = this.resourceManagerService.getCodeTable("SUPPLIER_STATUS_CODE")
    }
}
