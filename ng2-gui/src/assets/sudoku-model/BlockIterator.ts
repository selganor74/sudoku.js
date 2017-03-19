import {ISchemaIterator} from "./ISchemaIterator";
import {Cell} from "./Cell";
import {CellPosition} from "./CellPosition"
import {Schema} from "./Schema";

export class BlockIterator implements ISchemaIterator<Cell> {
    // -1 means before first element;
    private positionWithinBlock = -1;
    private xy: { x: number; y: number };

    constructor(private blockToIterate: number, private schema: Schema) {
    }

    private getCellAtPosition(): Cell {

        var position = CellPosition.blockAndPositionWithinBlockToPosition(this.blockToIterate, this.positionWithinBlock);
        return this.schema.cells[position];
    }

    public moveNext(): Cell {
        if (!this.hasNext())
            throw new Error("No elements left!");
        this.positionWithinBlock++;
        return this.getCellAtPosition();
    }

    public movePrevious(): Cell {
        if (!this.hasPrevious())
            throw new Error("No elements left!");
        this.positionWithinBlock--;
        return this.getCellAtPosition();
    }

    public hasNext(): boolean {
        return this.positionWithinBlock < CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
    }

    public hasPrevious(): boolean {
        return this.positionWithinBlock > 0;
    }

    public hasCurrent(): boolean {
        return this.positionWithinBlock != -1;
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