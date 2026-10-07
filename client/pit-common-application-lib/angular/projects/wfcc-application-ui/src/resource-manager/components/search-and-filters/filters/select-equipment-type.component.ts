import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-equipment-type",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectEquipmentTypeComponent extends BaseSelect {
    init() {
        this.title ||= 'Equipment Type'
        this.options = this.resourceManagerService.getCodeTable("EQUIPMENT_CLASSIFICATION_TYPE");
    }
}
