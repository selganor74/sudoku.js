var Sudoku;
(function (Sudoku) {
    var Schema = (function () {
        function Schema() {
            this._cells = [];
            this.NUMBER_OF_CELLS_PER_SIDE = 9;
        }
        Object.defineProperty(Schema.prototype, "cells", {
            get: function () {
                return this._cells;
            },
            enumerable: true,
            configurable: true
        });
        Schema.prototype.getNumberOfCellsPerSide = function () {
            return this.NUMBER_OF_CELLS_PER_SIDE;
        };
        Schema.prototype.createNew = function () {
            this.buildInitialCellSet();
            this.organizeCellsIntoRowsColumnsAndBlocks();
            this.combineCellsAndRowsColumnsBlocksArray();
        };
        Schema.prototype.getNumberOfCombinations = function () {
            var result = 1;
            for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
                var numberOfPossibleValues = this._cells[i].numberOfPossibleValues;
                if (numberOfPossibleValues > 0)
                    result = result * this._cells[i].numberOfPossibleValues;
            }
            return result;
        };
        Schema.prototype.dumpSchema = function () {
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
        };
        Schema.prototype.getCellAtXyPosition = function (x, y) {
            var position = Sudoku.CellPosition.xyToPosition({ x: x, y: y });
            return this._cells[position];
        };
        Schema.prototype.organizeCellsIntoRowsColumnsAndBlocks = function () {
            this.rowsArray = this.buildArrayFromIterator(function (index, schema) { return new Sudoku.RowIterator(index, schema); });
            this.columnsArray = this.buildArrayFromIterator(function (index, schema) { return new Sudoku.ColumnIterator(index, schema); });
            this.blocksArray = this.buildArrayFromIterator(function (index, schema) { return new Sudoku.BlockIterator(index, schema); });
        };
        Schema.prototype.combineCellsAndRowsColumnsBlocksArray = function () {
            for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
                var position = this._cells[i].position;
                var cell = this._cells[i];
                cell.inMyBlock = this.blocksArray[position.block];
                cell.inMyColumn = this.columnsArray[position.x];
                cell.inMyRow = this.rowsArray[position.y];
            }
        };
        Schema.prototype.buildInitialCellSet = function () {
            for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE * this.NUMBER_OF_CELLS_PER_SIDE; i++) {
                this._cells.push(new Sudoku.Cell(i));
            }
        };
        Schema.prototype.getRowIterator = function (row) {
            return new Sudoku.RowIterator(row, this);
        };
        Schema.prototype.getColumnIterator = function (column) {
            return new Sudoku.ColumnIterator(column, this);
        };
        Schema.prototype.getBlockIterator = function (block) {
            return new Sudoku.BlockIterator(block, this);
        };
        Schema.prototype.buildArrayFromIterator = function (iteratorFactory) {
            var outArray = [];
            for (var i = 0; i < this.NUMBER_OF_CELLS_PER_SIDE; i++) {
                var iterator = iteratorFactory(i, this);
                var thisRowArray = [];
                while (iterator.hasNext()) {
                    thisRowArray.push(iterator.moveNext());
                }
                outArray.push(thisRowArray);
            }
            return outArray;
        };
        return Schema;
    })();
    Sudoku.Schema = Schema;
})(Sudoku || (Sudoku = {}));
//# sourceMappingURL=Schema.js.map