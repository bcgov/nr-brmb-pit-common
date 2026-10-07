import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseSelect } from "./base-select";

@Component({
    selector: "wf-select-function",
    templateUrl: './base-select.html',
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectFunctionComponent extends BaseSelect {
    init() {
        this.title ||= 'Current Year Function(s)'
        this.options = this.resourceManagerService.getCodeTable( 'getResourceFunctions' )
        this.multi ??= true
        this.maxSelect ??= 3
    }
}
