import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BaseSelect } from "./base-select";
import { ResourceManagerService } from "../../../resource-manager.service";

@Component({
    selector: "wf-select-fire-zone",
    templateUrl: "./base-select.html",
    styleUrls: [
        "./base-select.scss",
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WfSelectFireZoneComponent extends BaseSelect implements OnChanges {
    @Input() fireCentreCode

    constructor(
        protected resourceManagerService: ResourceManagerService,
        private cdr: ChangeDetectorRef
    ) { 
        super( resourceManagerService )
    }
    
    init() {
        this.title ||= 'Fire Zone'
        this.options = this.resourceManagerService.getCodeTable( "ZONE_CODE" )
        this.multi ??= true
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.fireCentreCode ) {
            setTimeout(() => {
                if ( this.fireCentreCode && this.fireCentreCode.length > 0 ) {
                    this.options = this.resourceManagerService.getCodeTable( "ZONE_CODE", this.fireCentreCode[0] )
                }
                else {
                    this.options = this.resourceManagerService.getCodeTable( "ZONE_CODE" )
                }

                this.value = this.value.filter( v => this.options.some( o => o.code == v ) )

                this.cdr.detectChanges()           
            })            
        }
    }
}
