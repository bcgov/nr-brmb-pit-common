import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { applicationMetrics } from './application.metrics';
import { WfApplicationComponent } from './components/wf-application/wf-application.component';
import { WfFooterComponent } from './components/wf-footer/wf-footer.component';
import { WfHeaderComponent } from './components/wf-header/wf-header.component';
import { WfIconComponent } from './components/wf-icon/wf-icon.component';
import { WfMenuBarComponent } from './components/wf-menu-bar/wf-menu-bar.component';
import { WfMenuComponent } from './components/wf-menu/wf-menu.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
        MatButtonModule,
        MatMenuModule,
        ScrollingModule
        // BrowserAnimationsModule
    ],
    declarations: [
        WfApplicationComponent,
        WfFooterComponent,
        WfHeaderComponent,
        WfIconComponent,
        WfMenuComponent,
        WfMenuBarComponent,
    ],
    exports: [
        WfApplicationComponent,
        WfFooterComponent,
        WfHeaderComponent,
        WfIconComponent,
        WfMenuComponent,
        WfMenuBarComponent,
    ]
})
export class WildfireApplicationModule {
    static forRoot(): ModuleWithProviders<WildfireApplicationModule> {
        // console.log('WildfireApplicationModule.forRoot')
        const doc = window[ 'document' ]

        const style = doc.createElement( 'style' )
        style.textContent = applicationMetrics.map( ( m ) => {
            return `
${ m.selector } {
    ${ Object.entries( m.variables ).map( ( [ key, value ] ) => `${ key }: ${ value };` ).join( '\n    ' ) }
}`
        } ).join( '\n' )

        doc.getElementsByTagName( 'head' )[ 0 ].appendChild( style )

        return {
            ngModule: WildfireApplicationModule
        }
    }
}
