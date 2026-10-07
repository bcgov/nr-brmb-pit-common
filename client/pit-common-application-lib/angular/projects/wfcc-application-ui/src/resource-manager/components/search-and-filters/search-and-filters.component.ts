import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";

@Component({
    selector: "wf-search-and-filters",
    templateUrl: "./search-and-filters.component.html",
    styleUrls: [
        "./search-and-filters.component.scss"
    ],
})
export class WfSearchAndFiltersComponent {
    @Input() searchText: string;

    @Output() filterReset = new EventEmitter<any>();
    @Output() searchTextChange = new EventEmitter<string>();

    constructor(
        protected cdr: ChangeDetectorRef
    ) {}

    onSearch() {
        this.searchTextChange.emit( this.searchText )
    }

    onReset() {
        this.filterReset.emit()
    }
}
