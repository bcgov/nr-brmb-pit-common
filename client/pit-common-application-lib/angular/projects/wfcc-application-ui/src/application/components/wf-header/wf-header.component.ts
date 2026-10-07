import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../base.component';
import { WfMenuItems } from '../wf-menu/wf-menu.component';

@Component({
    selector: 'wf-header',
    templateUrl: './wf-header.component.html',
    styleUrls: ['./wf-header.component.scss']
})
export class WfHeaderComponent extends BaseComponent {
    @Input() useAppLogo: boolean = true
    @Input() useSystemAndUser: boolean = true
    @Input() useMenu: boolean = true
    @Input() useSupportLink: boolean = false
    @Input() useLogoutButton: boolean = false

    _supportMenu: WfMenuItems
    @Input() set supportMenuItems(m: WfMenuItems) {
        this._supportMenu = m
    }
    get supportMenuItems() { return this._supportMenu }
    get useSupportMenu() { return !!this._supportMenu }

    @Output() bcLogoClick = new EventEmitter<any>()
    @Output() supportLinkClick = new EventEmitter<any>()
    @Output() logoutClick = new EventEmitter<any>()

    onMenuClick() {
        this.menuState = this.menuState == 'expanded' ? 'hidden' : 'expanded'
    }

    onBCLogoClick() {
        this.bcLogoClick.emit();
    }

    onSupportLinkClick() {
        this.supportLinkClick.emit();
    }

    onLogoutClick() {
        this.logoutClick.emit()
    }

    get bcLogoClickEnable() {
        return this.bcLogoClick.observers.length > 0
    }
}
