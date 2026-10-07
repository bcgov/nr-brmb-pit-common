import { Injectable } from "@angular/core";
import { WfDevice } from "../public-api";

export type CodeTableKey =
    'RESOURCE_AGENCY_CODE' |
    'AGREEMENT_TYPE_CODE' |
    'FIRE_YEARS' |
    'SUPP_RSRC_REVIEW_STATUS_CODE' |
    'RSRC_CLASSN_REVIEW_STATUS_CODE' |
    'EQUIPMENT_KIND' |
    'EQUIPMENT_CLASSIFICATION_TYPE' |
    'FIRE_CENTRE_CODE' |
    'ZONE_CODE' |
    'RESOURCE_CERTIFICATION_CODE' |
    'SUPPLIER_RESOURCE_STATUS_CODE' |
    'PROVIDER_TYPE_CODE' |
    'SUPPLIER_STATUS_CODE' |
    'getResourceFunctions' |
    'getFunctionsAndResourceClassifications' |
    'getFCAndFZCodeOptions' |
    'ASSIGN_MEMBER_RSRC_TYPE_CODE' |
    'ASSIGNMENTS' |
    'LOCATION_TYPE_CODE'

export type CodeTableEntry = {
    code: string
    description: string
}

export type CodeTableEntries = CodeTableEntry[]

@Injectable({providedIn: "root"})
export class ResourceManagerService {
    private _loader: ( key: CodeTableKey, subKey?: string ) => CodeTableEntries
    private _codeTable: { [key in CodeTableKey]?: CodeTableEntries } = {}

    private _device: WfDevice
    get device(): WfDevice { return this._device }
    set device( d: WfDevice ) { this._device = d }

    registerCodeTableLoader( loader: ( key: CodeTableKey, subKey?: string ) => CodeTableEntries ) {
        this._loader = loader
    }

    hasCodeTable( key: CodeTableKey ): boolean {
        return !!this._codeTable[ key ]
    }

    loadCodeTable( key: CodeTableKey, entries: CodeTableEntries ) {
        this._codeTable[ key ] = entries
    }

    getCodeTable( key: CodeTableKey, subKey?: string ): CodeTableEntries {
        let tKey = tableKey( key, subKey )

        if ( this.hasCodeTable( tKey ) )
            return this._codeTable[ tKey ]

        if ( this._loader ) {
            this.loadCodeTable( tKey, this._loader( key, subKey ) )

            return this._codeTable[ tKey ]
        }

        console.warn( 'code table ' + tKey + ' is undefined' )
        return [
            { code: 'missing', description: 'Code table ' + tKey + ' is undefined' }
        ]
    }
}

function tableKey( key: CodeTableKey, subKey?: string ): CodeTableKey {
    if ( !subKey ) return key

    return key + '|' + subKey as CodeTableKey
}
