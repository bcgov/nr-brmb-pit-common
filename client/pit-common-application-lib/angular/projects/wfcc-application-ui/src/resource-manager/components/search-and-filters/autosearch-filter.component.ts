import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { debounceTime } from "rxjs/operators";

export type Option = { id: string, value: string };
export type SearchState = 'new' | 'matched' | 'contained' | 'invalid';

@Component({
    selector: "wf-autosearch-filter",
    templateUrl: "./autosearch-filter.component.html",
    styleUrls: [
        "./autosearch-filter.component.scss"
    ]
})
export class WfAutosearchFilterComponent implements OnInit, OnChanges {
    @Input() options: Option[];
    @Input() selectText = '';
    @Input() hidePreview: boolean;
    @Input() debounceTimeMs: number;
    @Input() getPreviewText!: (data: Option | string) => string;
    @Input() getOptionText!: (data: Option | string) => string;
    @Input() placeholderText: '';

    @Output() updatedOption?: EventEmitter<Option | string> = new EventEmitter();
    @Output() updateState?: EventEmitter<SearchState> = new EventEmitter();

    @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

    invalidCharRegex = /[^a-zA-Z0-9]/g;
    searchText: string = '';
    state: SearchState;

    formControl = new FormControl('');

    onInput(event: any) {
        const input = event.target.value as string;

        // replace any non-alphanumeric characters
        const filteredInput = input?.trim().slice(0, 30).replace(this.invalidCharRegex, '');
        this.searchText = input;

        event.target.value = filteredInput;
        this.formControl.setValue(filteredInput);

        // if the input had to be changed due to validation error mark the search as invalid
        if (input?.length != filteredInput?.length || input?.length > 30) {
            this.state = 'invalid';
            this.autocompleteTrigger.closePanel();
        }
    }

    ngOnInit() {
        this.formControl.valueChanges
        .pipe(debounceTime(this.debounceTimeMs))
        .subscribe(value => this.filter(value || ''));
    }

    ngOnChanges(): void {
        // observe changes to the options and set the state accordingly
        if (this.options.length > 1) this.state = 'contained';
    }

    private filter(value: string | Option): Option[] {
        if (this.state == 'invalid') {
            this.updateState.emit(this.state);
            this.updatedOption.emit(this.searchText);
            this.state = 'new'; // reset state to 'new' since new value is added
            return;
        };

        this.searchText = typeof value === 'string' ? value : (value as Option).value
        const options = this.options.filter(option => option.value.toLowerCase().includes(this.searchText.toLowerCase()));

        if (options.length == 1 && options[0].value.toLowerCase() == this.searchText.toLowerCase()) {
            // match found when there is only one option left
            this.state = 'matched';
        } else if (options.length == 0) {
            // if no options, then new text that doesn't match any options is being added
            this.state = 'new';
        } else {
            // if there are multiple options still available that contain the search text
            this.state = 'contained';
        }

        this.updateState.emit(this.state);
        this.updatedOption.emit(this.formControl.value);
    }

    get isSearcheable() {
        if (this.state == 'invalid') return false;
        
        if (this.options.length > 0) return true;

        // no longer searchable if new option is entered
        return this.state != 'new';
    }

    get showPreview() {
        if (this.hidePreview === true || this.state == 'invalid') return false;
        
        if (!this.previewText) return false;

        // show the preview if there is no match while searching
        return this.formControl.value?.length > 0 && this.state != 'matched';
    }

    get previewText() {
        return this.getPreviewText(this.searchText?.trim().slice(0, 30).replace(this.invalidCharRegex, ''));
    }

    displayOption(option: Option) {
        return this.getOptionText(option);
    }

    selectedOptionDisplay(option: Option | string) {
        if (typeof option === 'string') return option.replace(/[^a-zA-Z0-9]/g, '');
        
        return option?.value || '';
    }

    clearInput() {
        this.formControl.setValue('');
        this.searchText = ''; 
        this.state = 'new';
    }
}