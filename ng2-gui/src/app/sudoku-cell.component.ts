import { Component, Input } from '@angular/core';
import * as Sudoku from "../assets/sudoku-model";

@Component({
    selector: 'sudoku-cell',
    templateUrl: './sudoku-cell.component.html',
})
export class SudokuCellComponent {
    
    @Input() cell: Sudoku.Cell;

    constructor() {
        
    }

    public getBackgroundColor() {
        return this.cell.position.block % 2 ? "lightgray" : "white";
    }

}