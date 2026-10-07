import {
    Directive,
    EventEmitter,
    Input, Output
} from "@angular/core";
import { CodeTableEntries, CodeTableEntry, ResourceManagerService } from "../../../resource-manager.service";

@Directive()
export class BaseSelect {
    @Input() value: string[]
    @Input() title: string
    @Input() multi: boolean
    @Input() maxSelect: number
    @Input() filter: boolean = true

    private _optionsFilter: ( CodeTableEntry ) => boolean = () => true
    @Input( 'optionsFilter' ) set optionsFilter( filter: ( CodeTableEntry ) => boolean ) {
        this._optionsFilter = filter 
    }

    @Output() valueChange = new EventEmitter<string[]>()

    private _options: CodeTableEntries
    get options(): CodeTableEntries {
        return this._options?.filter( this._optionsFilter )
    }
    set options( v: CodeTableEntries ) {
        this._options = v
    }

    constructor(
        protected resourceManagerService: ResourceManagerService
    ) {
        setTimeout( () => { this.init() } )
    }

    init() {}

    get mobile(): boolean {
        return this.resourceManagerService.device == 'mobile'
    }

    get selectedValue(): string {
        return this.value?.[ 0 ] || ''
    }

    get selectedValues(): string[] {
        return this.value || []
    }

    onUpdated( ev ) {
        this.valueChange.emit( ev )
    }

    get placeholder() {
        if ( this.mobile ) return this.title
        return 'Select...'
    }

    get label() {
        if ( this.mobile ) return
        return this.title
    }

    get subLabel(): string {
        if ( !this.maxSelect ) return
        return `Select up to ${ this.maxSelect }`
    }

    get selectAll(): boolean {
        return !this.maxSelect 
    }

    optionCode(option: CodeTableEntry): string {
        return option.code
    }

    optionDescription(option: CodeTableEntry): string {
        return option.description
    }
}

export const sortByDescription = function ( a: CodeTableEntry, b: CodeTableEntry ) {
    let aa = a.description.toUpperCase()
    let bb = b.description.toUpperCase()
    if (aa < bb) return -1
    if (aa > bb) return 1
    return 0
};
