import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-supplier-provider",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectSupplierProviderComponent extends BaseSelect {
    init() {
        this.title ||= 'Supplier Provider'
        this.options = this.resourceManagerService.getCodeTable( "PROVIDER_TYPE_CODE" )
    }
}
