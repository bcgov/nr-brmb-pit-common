import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { WfAdvancedFiltersComponent } from './components/search-and-filters/advanced-filters.component';
import { WfFilterFieldComponent } from './components/search-and-filters/filter-field.component';
import { WfSelectAgencyTypeComponent } from './components/search-and-filters/filters/select-agency-type.component';
import { WfSelectAgreementTypeComponent } from './components/search-and-filters/filters/select-agreement-type.component';
import { WfSelectAgreementYearComponent } from './components/search-and-filters/filters/select-agreement-year.component';
import { WfSelectApprovalStatusCodeComponent } from './components/search-and-filters/filters/select-approval-status-code.component';
import { WfSelectEquipmentKindComponent } from './components/search-and-filters/filters/select-equipment-kind.component';
import { WfSelectEquipmentTypeComponent } from './components/search-and-filters/filters/select-equipment-type.component';
import { WfSelectFireCentreComponent } from './components/search-and-filters/filters/select-fire-centre.component';
import { WfSelectFireZoneComponent } from './components/search-and-filters/filters/select-fire-zone.component';
import { WfSelectFunctionQualificationStatusComponent } from './components/search-and-filters/filters/select-function-qualification-status.component';
import { WfSelectFunctionComponent } from './components/search-and-filters/filters/select-function.component';
import { WfSelectResourceClassificationCodeComponent } from './components/search-and-filters/filters/select-resource-classification-code.component';
import { WfSelectResourceStatusCodeComponent } from './components/search-and-filters/filters/select-resource-status-code.component';
import { WfSelectResponsibleOrgUnitComponent } from './components/search-and-filters/filters/select-responsible-org-unit.component';
import { WfSelectSupplierProviderComponent } from './components/search-and-filters/filters/select-supplier-provider.component';
import { WfSelectSupplierStatusCodeComponent } from './components/search-and-filters/filters/select-supplier-status-code.component';
import { WfSearchAndFiltersComponent } from './components/search-and-filters/search-and-filters.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ResourceManagerService } from './resource-manager.service';
import { MultiSelectDirective } from './directives/multi-select.directive';
import { SingleSelectDirective } from './directives/single-select.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    WfSelectPersonnelApprovalStatusCodeComponent
} from "./components/search-and-filters/filters/select-personnel-approval-status-code.component";
import { WfSelectResourceTypeComponent } from './components/search-and-filters/filters/select-resource-type.component';
import { WfSelectBooleanComponent } from './components/search-and-filters/filters/select-boolean.component';
import { resourceManagerMetrics } from './resource-manager.metrics';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { WfSelectAssignmentComponent } from './components/search-and-filters/filters/select-assignment.component';
import { WfAutosearchFilterComponent } from './components/search-and-filters/autosearch-filter.component';
import { WfSelectLocationTypeComponent } from './components/search-and-filters/filters/select-location-type-component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
        MatButtonModule,
        MatMenuModule,
        ScrollingModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MultiSelectDirective,
        SingleSelectDirective,
        WfSearchAndFiltersComponent,
        WfFilterFieldComponent,
        WfAdvancedFiltersComponent,
        WfSelectAgencyTypeComponent,
        WfSelectAgreementTypeComponent,
        WfSelectAgreementYearComponent,
        WfSelectApprovalStatusCodeComponent,
        WfSelectPersonnelApprovalStatusCodeComponent,
        WfSelectEquipmentKindComponent,
        WfSelectEquipmentTypeComponent,
        WfSelectFireCentreComponent,
        WfSelectFireZoneComponent,
        WfSelectFunctionQualificationStatusComponent,
        WfSelectFunctionComponent,
        WfSelectResourceClassificationCodeComponent,
        WfSelectResourceStatusCodeComponent,
        WfSelectResponsibleOrgUnitComponent,
        WfSelectSupplierProviderComponent,
        WfSelectSupplierStatusCodeComponent,
        WfSelectResourceTypeComponent,
        WfSelectBooleanComponent,
        WfAutosearchFilterComponent,
        WfSelectAssignmentComponent,
        WfSelectLocationTypeComponent
    ],
    exports: [
        MultiSelectDirective,
        SingleSelectDirective,
        WfSearchAndFiltersComponent,
        WfFilterFieldComponent,
        WfAdvancedFiltersComponent,
        WfSelectAgencyTypeComponent,
        WfSelectAgreementTypeComponent,
        WfSelectAgreementYearComponent,
        WfSelectApprovalStatusCodeComponent,
        WfSelectPersonnelApprovalStatusCodeComponent,
        WfSelectEquipmentKindComponent,
        WfSelectEquipmentTypeComponent,
        WfSelectFireCentreComponent,
        WfSelectFireZoneComponent,
        WfSelectFunctionQualificationStatusComponent,
        WfSelectFunctionComponent,
        WfSelectResourceClassificationCodeComponent,
        WfSelectResourceStatusCodeComponent,
        WfSelectResponsibleOrgUnitComponent,
        WfSelectSupplierProviderComponent,
        WfSelectSupplierStatusCodeComponent,
        WfSelectResourceTypeComponent,
        WfSelectBooleanComponent,
        WfAutosearchFilterComponent,
        WfSelectAssignmentComponent,
        WfSelectLocationTypeComponent
    ],
    providers: [
        ResourceManagerService
    ]
})
export class WildfireResourceManagerModule {
    static forRoot(): ModuleWithProviders<WildfireResourceManagerModule> {
        const doc = window[ 'document' ]

        const style = doc.createElement( 'style' )
        style.textContent = resourceManagerMetrics.map( ( m ) => {
            return `
${ m.selector } {
    ${ Object.entries( m.variables ).map( ( [ key, value ] ) => `${ key }: ${ value };` ).join( '\n    ' ) }
}`
        } ).join( '\n' )

        doc.getElementsByTagName( 'head' )[ 0 ].appendChild( style )

        return {
            ngModule: WildfireResourceManagerModule
        }
    }
}
