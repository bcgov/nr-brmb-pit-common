import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NavigationEnd, Router, UrlTree } from "@angular/router";
import { WfMenuState } from "../../application.config";
import { BaseComponent } from "../base.component";
import { WfMenuItem, WfMenuItems } from "../wf-menu/wf-menu.component";

@Component({
    selector: 'wf-menu-bar',
    templateUrl: './wf-menu-bar.component.html',
    styleUrls: ['./wf-menu-bar.component.scss'],
})
export class WfMenuBarComponent extends BaseComponent {
    _menu: WfMenuItems
    @Input() set menuItems( m: WfMenuItems ) {
        this._menu = m
        this._menu.forEach( i => i.OnActiveChanged( () => {
            this.activeItemChanged.emit( i )
        } ) )
    }
    get menuItems() { return this._menu }

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

