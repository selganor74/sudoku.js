var Sudoku;
(function (Sudoku) {
    var RowIterator = (function () {
        function RowIterator(rowToIterate, schema) {
            this.rowToIterate = rowToIterate;
            this.schema = schema;
            // -1 means before first element;
            this.xPosition = -1;
        }
        RowIterator.prototype.getCellAtPosition = function () {
            this.xy = { x: this.xPosition, y: this.rowToIterate };
            var position = Sudoku.CellPosition.xyToPosition(this.xy);
            return this.schema.cells[position];
        };
        RowIterator.prototype.moveNext = function () {
            if (!this.hasNext())
                throw new Error("No elements left!");
            this.xPosition++;
            return this.getCellAtPosition();
        };
        RowIterator.prototype.movePrevious = function () {
            if (!this.hasPrevious())
                throw new Error("No elements left!");
            this.xPosition--;
            return this.getCellAtPosition();
        };
        RowIterator.prototype.hasNext = function () {
            return this.xPosition < Sudoku.CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
        };
        RowIterator.prototype.hasPrevious = function () {
            return this.xPosition > 0;
        };
        RowIterator.prototype.hasCurrent = function () {
            return this.xPosition != -1;
        };
        RowIterator.prototype.getCurrent = function () {
            return this.getCellAtPosition();
        };
        return RowIterator;
    })();
    Sudoku.RowIterator = RowIterator;
})(Sudoku || (Sudoku = {}));
//# sourceMappingURL=RowIterator.js.map