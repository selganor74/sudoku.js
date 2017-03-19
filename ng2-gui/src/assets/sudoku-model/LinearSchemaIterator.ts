import {ISchemaIterator} from "./ISchemaIterator";
import {Schema} from "./Schema";
import {Cell} from "./Cell";
import {CellPosition} from "./CellPosition";

export class LinearSchemaIterator implements ISchemaIterator<Cell> {
    // -1 means before first element;
    private position = -1;

    constructor(private schema: Schema) {
    }

    private getCellAtPosition(): Cell {
        return this.schema.cells[this.position];
    }

    public moveNext(): Cell {
        if (!this.hasNext())
            throw new Error("No elements left!");
        this.position++;
        return this.getCellAtPosition();
    }

    public movePrevious(): Cell {
        if (!this.hasPrevious())
            throw new Error("No elements left!");
        this.position--;
        return this.getCellAtPosition();
    }

    public hasNext(): boolean {
        return this.position < CellPosition.NUMBER_OF_CELLS_PER_SIDE * CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
    }

    public hasPrevious(): boolean {
        return this.position > 0;
    }

    public hasCurrent(): boolean {
        return this.position != -1;
    }

    public getCurrent(): Cell {
        return this.getCellAtPosition();
    }

    goAfterLast() {

    }
    
    goBeforeFirst() {
        
    }

}