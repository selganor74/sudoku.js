var Sudoku;
(function (Sudoku) {
    var BlockIterator = (function () {
        function BlockIterator(blockToIterate, schema) {
            this.blockToIterate = blockToIterate;
            this.schema = schema;
            // -1 means before first element;
            this.positionWithinBlock = -1;
        }
        BlockIterator.prototype.getCellAtPosition = function () {
            var position = Sudoku.CellPosition.blockAndPositionWithinBlockToPosition(this.blockToIterate, this.positionWithinBlock);
            return this.schema.cells[position];
        };
        BlockIterator.prototype.moveNext = function () {
            if (!this.hasNext())
                throw new Error("No elements left!");
            this.positionWithinBlock++;
            return this.getCellAtPosition();
        };
        BlockIterator.prototype.movePrevious = function () {
            if (!this.hasPrevious())
                throw new Error("No elements left!");
            this.positionWithinBlock--;
            return this.getCellAtPosition();
        };
        BlockIterator.prototype.hasNext = function () {
            return this.positionWithinBlock < Sudoku.CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
        };
        BlockIterator.prototype.hasPrevious = function () {
            return this.positionWithinBlock > 0;
        };
        BlockIterator.prototype.hasCurrent = function () {
            return this.positionWithinBlock != -1;
        };
        BlockIterator.prototype.getCurrent = function () {
            return this.getCellAtPosition();
        };
        return BlockIterator;
    })();
    Sudoku.BlockIterator = BlockIterator;
})(Sudoku || (Sudoku = {}));
//# sourceMappingURL=BlockIterator.js.map