
import {Schema} from "./Schema";
import {CellPosition} from "./CellPosition";
import {Cell} from "./Cell";
import {ISchemaIterator} from "./ISchemaIterator";

export class RowIterator implements ISchemaIterator<Cell> {
    // -1 means before first element;
    private xPosition = -1;
    private xy: { x: number; y: number };

    constructor(private rowToIterate: number, private schema: Schema) {
    }

    private getCellAtPosition(): Cell {
        this.xy = { x: this.xPosition, y: this.rowToIterate };

        var position = CellPosition.xyToPosition(this.xy);
        return this.schema.cells[position];
    }

    public moveNext(): Cell {
        if (!this.hasNext())
            throw new Error("No elements left!");
        this.xPosition++;
        return this.getCellAtPosition();
    }

    public movePrevious(): Cell {
        if (!this.hasPrevious())
            throw new Error("No elements left!");
        this.xPosition--;
        return this.getCellAtPosition();
    }

    public hasNext(): boolean {
        return this.xPosition < CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
    }

    public hasPrevious(): boolean {
        return this.xPosition > 0;
    }

    public hasCurrent(): boolean {
        return this.xPosition != -1;
    }

    public getCurrent(): Cell {
        return this.getCellAtPosition();
    }

    public goAfterLast() {
        throw new Error("Not implemented yet!");
    }
    
    public goBeforeFirst() {
        throw new Error("Not implemented yet!");        
    }


}