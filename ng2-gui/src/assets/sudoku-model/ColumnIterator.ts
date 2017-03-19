import {ISchemaIterator} from "./ISchemaIterator";
import {Cell} from "./Cell";
import {CellPosition} from "./CellPosition";
import {Schema} from "./Schema";

export class ColumnIterator implements ISchemaIterator<Cell> {
    // -1 means before first element;
    private yPosition = -1;
    private xy: { x: number; y: number };

    constructor(private columnToIterate: number, private schema: Schema) {
    }

    private getCellAtPosition(): Cell {
        this.xy = { x: this.columnToIterate, y: this.yPosition };

        var position = CellPosition.xyToPosition(this.xy);
        return this.schema.cells[position];
    }

    public moveNext(): Cell {
        if (!this.hasNext())
            throw new Error("No elements left!");
        this.yPosition++;
        return this.getCellAtPosition();
    }

    public movePrevious(): Cell {
        if (!this.hasPrevious())
            throw new Error("No elements left!");
        this.yPosition--;
        return this.getCellAtPosition();
    }

    public hasNext(): boolean {
        return this.yPosition < CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
    }

    public hasPrevious(): boolean {
        return this.yPosition > 0;
    }

    public hasCurrent(): boolean {
        return this.yPosition != -1;
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