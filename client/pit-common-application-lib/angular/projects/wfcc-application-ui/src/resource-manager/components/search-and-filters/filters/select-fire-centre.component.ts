import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-fire-centre",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectFireCentreComponent extends BaseSelect {
    init() {
        this.title ||= 'Fire Centre'
        this.options = this.resourceManagerService.getCodeTable( "FIRE_CENTRE_CODE" )
    }
}
