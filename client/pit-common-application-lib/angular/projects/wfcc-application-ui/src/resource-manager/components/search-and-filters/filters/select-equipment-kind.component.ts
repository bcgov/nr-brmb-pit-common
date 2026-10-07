import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-equipment-kind",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectEquipmentKindComponent extends BaseSelect {
    init() {
        this.title ||= 'Equipment Kind'
        this.options = this.resourceManagerService.getCodeTable("EQUIPMENT_KIND")
    }
}
