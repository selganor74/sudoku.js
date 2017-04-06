import { Component } from '@angular/core';
import * as Sudoku from "../assets/sudoku-model";

@Component({
    selector: 'sudoku-schema',
    templateUrl: './sudoku-schema.component.html',
})
export class SudokuSchemaComponent {
    public schemaRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public schemaColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public schema: Sudoku.Schema = new Sudoku.Schema();
    public solver: Sudoku.SchemaSolver;

    constructor() {
        this.reset();
    }

    public solve() {
        this.solver.moveNext();
    }

    public reset() {
        this.schema = new Sudoku.Schema();
        this.schema.createNew();

        this.schema.getCellAtXyPosition(0, 8).setConstrainedValue("1");
        this.schema.getCellAtXyPosition(1, 7).setConstrainedValue("2");
        this.schema.getCellAtXyPosition(2, 6).setConstrainedValue("3");
        this.schema.getCellAtXyPosition(3, 5).setConstrainedValue("4");
        this.schema.getCellAtXyPosition(4, 4).setConstrainedValue("5");
        this.schema.getCellAtXyPosition(5, 3).setConstrainedValue("6");
        this.schema.getCellAtXyPosition(6, 2).setConstrainedValue("7");
        this.schema.getCellAtXyPosition(7, 1).setConstrainedValue("8");
        this.schema.getCellAtXyPosition(8, 0).setConstrainedValue("9");

        this.solver = new Sudoku.SchemaSolver(this.schema, new Sudoku.OrderedSchemaIterator(this.schema));
    }

    public clear() {
        let i = new Sudoku.LinearSchemaIterator(this.schema);
        while (i.hasNext()) {
             i.moveNext().clear();
        }        
    }

}