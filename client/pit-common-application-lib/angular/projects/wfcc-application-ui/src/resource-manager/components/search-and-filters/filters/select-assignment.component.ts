import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-assignment",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectAssignmentComponent extends BaseSelect {
    init() {
        this.title ||= 'Assignments'
        this.options = this.resourceManagerService.getCodeTable( "ASSIGNMENTS" )
        this.multi ??= true
    }
}
