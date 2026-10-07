import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges
} from "@angular/core";
import { arrayEquals, getContainerSelector, getScrollParent, handlePositionChange, setContainerOpen } from "./select-util";

declare var $: any;

@Directive( {
    selector: '[appWFMultiSelect]'
} )
export class MultiSelectDirective implements AfterViewInit, OnChanges, OnDestroy {
    @Input() appWFPlaceholder?: string;
    @Input() options: any[];
    @Input() selected: any[];
    @Input() maxSelect?: number;
    @Input() showSelectAll?: boolean = true;
    @Input() filter: boolean = true;
    @Input() width
    
    @Output() updated: EventEmitter<any> = new EventEmitter();

    selectHtmlElement: HTMLSelectElement;
    multiselect;
    hasDisabledOptions = false;
    previousSelection = ''
    positionPollinterval
    removeScrollHandler

    constructor(
        private element: ElementRef,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.options && !arrayEquals( changes.options.currentValue, changes.options.previousValue ) ) {
            this.options = changes.options.currentValue;
            setTimeout( () => {
                this.cdr.detectChanges();
                this.multiselect.multipleSelect( "refresh" );
            } );
        }

        if ( changes.selected && !arrayEquals( changes.selected.currentValue, changes.selected.previousValue ) ) {
            setTimeout( () => {
                this.selected = changes.selected.currentValue || [];
                this.multiselect.multipleSelect( "setSelects", this.selected );
                this.updateOptions()
            } );
        }

        if ( changes.appWFPlaceholder ) {
            this.appWFPlaceholder = changes.appWFPlaceholder.currentValue;
            setTimeout( () => {
                this.cdr.detectChanges();
                this.multiselect.multipleSelect( "refreshOptions", { "placeholder": this.appWFPlaceholder } );
            } );
        }

        if (changes.showSelectAll) {            
            setTimeout(() => {
                this.cdr.detectChanges();
                if ( this.multiselect )
                    this.multiselect.multipleSelect("refreshOptions", {"selectAll": this.showSelectAll});
            });
        }
    }

    ngAfterViewInit() {
        let scrollParent

        this.selectHtmlElement = this.element.nativeElement;

        let cls = this.width ? 'width-set' : 'width-default'

        this.multiselect = $( this.selectHtmlElement ).multipleSelect( {
            placeholder: this.appWFPlaceholder ? this.appWFPlaceholder : "Select...",
            minimumCountSelected: 1,
            onClick: () => { this.selectionUpdated() },
            onCheckAll: this.checkAll.bind( this ),
            onUncheckAll: this.uncheckAll.bind( this ),
            filter: this.filter,
            selectAll: this.showSelectAll,
            container: getContainerSelector(),
            onOpen: () => { setContainerOpen( true, scrollParent, cls ) },
            onClose: () => { setContainerOpen( false, scrollParent, cls ) },
            classes: cls,
            width: this.width,
            dropWidth: this.width,
        } );

        this.positionPollinterval = handlePositionChange( this.multiselect );

        setTimeout(() => {
            scrollParent = getScrollParent( this.selectHtmlElement )
        } )
    }

    ngOnDestroy(): void {
        clearInterval( this.positionPollinterval )
        if ( this.removeScrollHandler ) this.removeScrollHandler()
    }

    updateOptions() {
        let selected = [];
        for ( let i = 0; i < this.selectHtmlElement.selectedOptions.length; i++ ) {
            selected.push( this.selectHtmlElement.selectedOptions.item( i ).value );
        }
        if ( this.maxSelect ) { //if a max select value has been specified
            if ( selected.length >= this.maxSelect ) { //check if max selection limit has been reached
                for ( let i = 0; i < this.selectHtmlElement.options.length; i++ ) {
                    if ( selected.includes( this.selectHtmlElement.options.item( i ).value ) ) { //enable all selected options
                        this.selectHtmlElement.options.item( i ).removeAttribute( "disabled" );
                    } 
                    else { //disable all unselected options
                        this.selectHtmlElement.options.item( i ).setAttribute( "disabled", "disabled" );
                    }
                }
                this.hasDisabledOptions = true;
                this.refreshMaintainScroll();
            } 
            else if (this.hasDisabledOptions) { //if max selection limit has not been reached
                for ( let i = 0; i < this.selectHtmlElement.options.length; i++ ) { //enable all options
                    this.selectHtmlElement.options.item( i ).removeAttribute( "disabled" );
                }
                this.hasDisabledOptions = false;
                this.refreshMaintainScroll();
            }
        }

        this.selectionUpdated()
    }

    refreshMaintainScroll() {
        let ul = this.multiselect.data( 'multipleSelect' )?.$drop?.find( 'ul' ).get( 0 )
        if ( !ul ) return

        let scrollPos = ul.scrollTop;

        this.multiselect.multipleSelect( "close" )
        this.multiselect.multipleSelect( "refresh" )
        this.multiselect.multipleSelect( "open" )

        let ul1 = this.multiselect.data( 'multipleSelect' )?.$drop?.find( 'ul' ).get( 0 )
        if ( !ul1 ) return

        ul1.scrollTop = scrollPos;
    }

    uncheckAll() {
        this.selectionUpdated()
            }

    checkAll() {
        this.selectionUpdated()
    }

    selectionUpdated() {
        let selection = this.multiselect.multipleSelect( 'getSelects' )
        let serialized = JSON.stringify( selection )

        if ( serialized == this.previousSelection ) return

        this.previousSelection = serialized
        this.updated.emit( selection )
    }
}
