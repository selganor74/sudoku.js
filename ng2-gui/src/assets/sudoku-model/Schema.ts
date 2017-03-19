import {Cell} from "./Cell";
import {CellPosition} from "./CellPosition";
import {RowIterator} from "./RowIterator";
import {ColumnIterator} from "./ColumnIterator";
import {BlockIterator} from "./BlockIterator";
import {ISchemaIterator} from "./ISchemaIterator";

export class Schema {

    private _cells: Cell[] = [];
    get cells() {
        return this._cells;
    }

    private NUMBER_OF_CELLS_PER_SIDE = 9;
    public getNumberOfCellsPerSide() {
        return this.NUMBER_OF_CELLS_PER_SIDE;
    }

    private rowsArray: Array<Cell[]>;
    private columnsArray: Array<Cell[]>;
    private blocksArray: Array<Cell[]>;

    public createNew() {

        this.buildInitialCellSet();

        this.organizeCellsIntoRowsColumnsAndBlocks();

        this.combineCellsAndRowsColumnsBlocksArray();
    }

    public getNumberOfCombinations() {
        var result = 1;
        for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
            var numberOfPossibleValues = this._cells[i].numberOfPossibleValues;
            if (numberOfPossibleValues > 0)
                result = result * this._cells[i].numberOfPossibleValues;
        }
        return result;
    }

    public dumpSchema() {
        var lastPosition = null;
        var output = "";
        for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
            var currPosition = this._cells[i].position;
            if (lastPosition && currPosition.y != lastPosition.y)
                output = output + "\r\n";
            output = output + this._cells[i].currentValue;
            lastPosition = currPosition;
        }
        return output;
    }

    public getCellAtXyPosition(x: number, y: number) {
        var position = CellPosition.xyToPosition({ x: x, y: y });
        return this._cells[position];
    }

    private organizeCellsIntoRowsColumnsAndBlocks() {
        this.rowsArray = this.buildArrayFromIterator((index, schema) => { return new RowIterator(index, schema) });
        this.columnsArray = this.buildArrayFromIterator((index, schema) => { return new ColumnIterator(index, schema) });
        this.blocksArray = this.buildArrayFromIterator((index, schema) => { return new BlockIterator(index, schema) });
    }

    private combineCellsAndRowsColumnsBlocksArray() {
        for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
            var position = this._cells[i].position;
            var cell = this._cells[i];
            cell.inMyBlock = this.blocksArray[position.block];
            cell.inMyColumn = this.columnsArray[position.x];
            cell.inMyRow = this.rowsArray[position.y];
        }
    }

    private buildInitialCellSet() {
        for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
            this._cells.push(new Cell(i));
        }
    }

    private getRowIterator(row: number): ISchemaIterator<Cell> {
        return new RowIterator(row, this);
    }

    private getColumnIterator(column: number): ISchemaIterator<Cell> {
        return new ColumnIterator(column, this);
    }

    private getBlockIterator(block: number): ISchemaIterator<Cell> {
        return new BlockIterator(block, this);
    }

    private buildArrayFromIterator(iteratorFactory: (number, Schema) => ISchemaIterator<Cell>): Array<Cell[]> {
        var outArray: Array<Cell[]> = [];
        for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE; i++) {
            var iterator = iteratorFactory(i, this);
            var thisRowArray: Cell[] = [];
            while (iterator.hasNext()) {
                thisRowArray.push(iterator.moveNext());
            }
            outArray.push(thisRowArray);
        }
        return outArray;
    }
}