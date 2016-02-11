var Sudoku;
(function (Sudoku) {
    var LinearSchemaIterator = (function () {
        function LinearSchemaIterator(schema) {
            this.schema = schema;
            // -1 means before first element;
            this.position = -1;
        }
        LinearSchemaIterator.prototype.getCellAtPosition = function () {
            return this.schema.cells[this.position];
        };
        LinearSchemaIterator.prototype.moveNext = function () {
            if (!this.hasNext())
                throw new Error("No elements left!");
            this.position++;
            return this.getCellAtPosition();
        };
        LinearSchemaIterator.prototype.movePrevious = function () {
            if (!this.hasPrevious())
                throw new Error("No elements left!");
            this.position--;
            return this.getCellAtPosition();
        };
        LinearSchemaIterator.prototype.hasNext = function () {
            return this.position < Sudoku.CellPosition.NUMBER_OF_CELLS_PER_SIDE * Sudoku.CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
        };
        LinearSchemaIterator.prototype.hasPrevious = function () {
            return this.position > 0;
        };
        LinearSchemaIterator.prototype.hasCurrent = function () {
            return this.position != -1;
        };
        LinearSchemaIterator.prototype.getCurrent = function () {
            return this.getCellAtPosition();
        };
        return LinearSchemaIterator;
    })();
    Sudoku.LinearSchemaIterator = LinearSchemaIterator;
})(Sudoku || (Sudoku = {}));
//# sourceMappingURL=LinearSchemaIterator.js.map