import { Component, Input } from '@angular/core';
import * as Sudoku from "../assets/sudoku-model";

@Component({
    selector: 'sudoku-cell',
    templateUrl: './sudoku-cell.component.html',
})
export class SudokuCellComponent {
    
    @Input() cell: Sudoku.Cell;
    public isEditing: boolean = false;
    public isValid: boolean = true;

    constructor() {}

    public onKeyUp(ev: KeyboardEvent) {
        if (ev.key === "Enter") {
            this.isEditing = false;
            return;
        }
        let value = (<HTMLInputElement>ev.target).value.toString();
        if (value === "") {
            this.cell.setCurrentValue(this.cell.currentValue);
            this.isValid = true;
            return;
        }
        try {
            this.cell.setConstrainedValue(value);
            this.isValid = true;
        } catch(e) {
            this.isValid = false;
        }
    }

    public getBackgroundColor() {
        if (!this.isValid) {
            return "red";
        }
        return this.cell.position.block % 2 ? "lightgray" : "white";
    }

}