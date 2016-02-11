var Sudoku;
(function (Sudoku) {
    var ColumnIterator = (function () {
        function ColumnIterator(columnToIterate, schema) {
            this.columnToIterate = columnToIterate;
            this.schema = schema;
            // -1 means before first element;
            this.yPosition = -1;
        }
        ColumnIterator.prototype.getCellAtPosition = function () {
            this.xy = { x: this.columnToIterate, y: this.yPosition };
            var position = Sudoku.CellPosition.xyToPosition(this.xy);
            return this.schema.cells[position];
        };
        ColumnIterator.prototype.moveNext = function () {
            if (!this.hasNext())
                throw new Error("No elements left!");
            this.yPosition++;
            return this.getCellAtPosition();
        };
        ColumnIterator.prototype.movePrevious = function () {
            if (!this.hasPrevious())
                throw new Error("No elements left!");
            this.yPosition--;
            return this.getCellAtPosition();
        };
        ColumnIterator.prototype.hasNext = function () {
            return this.yPosition < Sudoku.CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
        };
        ColumnIterator.prototype.hasPrevious = function () {
            return this.yPosition > 0;
        };
        ColumnIterator.prototype.hasCurrent = function () {
            return this.yPosition != -1;
        };
        ColumnIterator.prototype.getCurrent = function () {
            return this.getCellAtPosition();
        };
        return ColumnIterator;
    })();
    Sudoku.ColumnIterator = ColumnIterator;
})(Sudoku || (Sudoku = {}));
//# sourceMappingURL=ColumnIterator.js.map