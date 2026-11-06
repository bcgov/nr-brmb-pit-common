import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
    selector: 'pit-application',
    templateUrl: './pit-application.component.html',
    styleUrls: ['./pit-application.component.scss',
        './pit-basic-tab.scss',
        './pit-file-tab.scss'],
    imports: [CdkScrollable]
})
export class PitApplicationComponent extends BaseComponent {
    @Input() isInitializing: boolean = false

    @HostBinding('class') get deviceClass() {
        return `device-${this.config.device} menu-${this.menuState}`
    }

    onBackdropClick() {
        this.menuState = 'hidden'
    }
}
