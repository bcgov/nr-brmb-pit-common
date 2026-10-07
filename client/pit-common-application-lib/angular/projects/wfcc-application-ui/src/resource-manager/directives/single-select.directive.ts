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
import { arrayEquals, getContainerSelector, getScrollParent, setContainerOpen } from "./select-util";

declare var $: any;

@Directive({
    selector: '[appWFSingleSelect]'
})
export class SingleSelectDirective implements AfterViewInit, OnChanges, OnDestroy {
    @Input() appWFPlaceholder?: string;
    @Output() updated: EventEmitter<any> = new EventEmitter();
    @Input() options: any[];
    @Input() selected: any;
    @Input() position: string = "bottom";
    @Input() filter: boolean = true;
    @Input() width

    selectHtmlElement: HTMLSelectElement;
    multiselect;
    positionPollinterval
    removeScrollHandler

    constructor(
        private element: ElementRef,
        private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        let scrollParent

        this.selectHtmlElement = this.element.nativeElement;
        
        // hack so that existing code for pagination UI shows sensible style for page size select
        let usePaginationWidth = this.selectHtmlElement.classList.contains( 'select-showEntriesSelection' )
        if ( usePaginationWidth && !this.width ) {
            this.width = 80
            this.filter = false
        }

        let cls = this.width ? 'width-set' : 'width-default'

        this.multiselect = $(this.selectHtmlElement).multipleSelect({
            placeholder: this.appWFPlaceholder ? this.appWFPlaceholder : "Select...",
            filter: this.filter,
            width: this.width,
            dropWidth: this.width,
            position: this.position,
            onClick: this.onClick.bind(this),
            container: getContainerSelector(),
            onOpen: () => { setContainerOpen( true, scrollParent, cls ) },
            onClose: () => { setContainerOpen( false, scrollParent, cls ) },
            classes: cls
        });

        setTimeout(() => {
            scrollParent = getScrollParent( this.selectHtmlElement )
        } )
    }

    ngOnDestroy(): void {
        clearInterval( this.positionPollinterval )
        if ( this.removeScrollHandler ) this.removeScrollHandler()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !arrayEquals(changes.options.currentValue, changes.options.previousValue)) {
            this.options = changes.options.currentValue;
            setTimeout(() => {
                this.cdr.detectChanges();
                this.multiselect.multipleSelect("refresh");
            });
        }
        
        if (changes.selected) {
            setTimeout(() => {
                this.selected = changes.selected.currentValue;
                this.multiselect.multipleSelect("setSelects", [this.selected]);
            });
        }

        if (changes.appWFPlaceholder) {
            this.appWFPlaceholder = changes.appWFPlaceholder.currentValue;
            setTimeout(() => {
                this.cdr.detectChanges();
                this.multiselect.multipleSelect("refreshOptions", {"placeholder": this.appWFPlaceholder});
            });
        }

        if ( changes.width ) {
            setTimeout( () => {
                this.multiselect.multipleSelect( "refreshOptions", {
                    'width': this.width,
                    'dropWidth': this.width,
                    'classes': this.width ? 'width-set' : 'width-default'
                } )
            } )
        }
    }

    onClick() {
        let selected = "";
        if (this.selectHtmlElement.selectedOptions && this.selectHtmlElement.selectedOptions.length) {
            selected = this.selectHtmlElement.selectedOptions.item(0).value;
        }
        this.updated.emit(selected);
    }


}
