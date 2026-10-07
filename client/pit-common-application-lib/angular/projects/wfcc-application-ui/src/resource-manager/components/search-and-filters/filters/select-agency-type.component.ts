import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BaseSelect, sortByDescription } from "./base-select";
import { CodeTableEntry } from "../../../resource-manager.service";

@Component({
    selector: "wf-select-agency-type",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectAgencyTypeComponent extends BaseSelect {
    @Input() includeInternalAgencies = false

    init() {
        this.title ||= 'Agency Type'

        let opts = this.resourceManagerService.getCodeTable( "RESOURCE_AGENCY_CODE" )
        if ( this.includeInternalAgencies ) {
            this.options = opts.sort( sortByDescription )
        }
        else {
            this.options = opts.filter( excludeInternalAgencies ).sort( sortByDescription )
        }

        this.multi ??= true
    }
}

function excludeInternalAgencies( c: CodeTableEntry ): boolean {
    if ( c.code == 'BCWS' ) return false   
    if ( c.code == 'BC Gov Other' ) return false   
    if ( c.code == 'BC Wildfire TEAMS' ) return false   
    return true
}