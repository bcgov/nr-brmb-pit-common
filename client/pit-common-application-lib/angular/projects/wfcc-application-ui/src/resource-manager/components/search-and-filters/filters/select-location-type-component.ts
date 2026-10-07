import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-location-type",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectLocationTypeComponent extends BaseSelect {
    init() {
        this.title ||= 'Location Type'
        this.options = this.resourceManagerService.getCodeTable('LOCATION_TYPE_CODE')
    }
}