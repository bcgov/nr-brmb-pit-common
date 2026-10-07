import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseComponent } from "../base.component";
import { WfMenuItem, WfMenuItems } from "../wf-menu/wf-menu.component";

@Component({
    selector: 'wf-footer',
    templateUrl: './wf-footer.component.html',
    styleUrls: ['./wf-footer.component.scss'],
})
export class WfFooterComponent extends BaseComponent {
    _menu: WfMenuItems
    @Input() set footerItems( m: WfMenuItems ) {
        this._menu = m
        this._menu.forEach( i => i.OnActiveChanged( () => {
            this.activeItemChanged.emit( i )
        } ) )
    }
    get footerItems() { return this._menu }

    @Output() activeItemChanged = new EventEmitter<WfMenuItem>();

    tooltipShowDelay = 300

    constructor() {
        super()
        this.activeItemChanged.subscribe( ( item ) => {
            if ( item.menuStateAfterActive && this.config && this.config.device != "desktop"){
                this.menuState = item.menuStateAfterActive
            }
        } )
    }

    onItemClick( item: WfMenuItem ) {
        this.activeItemChanged.emit( item )
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


