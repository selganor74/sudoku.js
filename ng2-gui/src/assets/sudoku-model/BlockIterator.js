"use strict";
var CellPosition_1 = require("./CellPosition");
var BlockIterator = (function () {
    function BlockIterator(blockToIterate, schema) {
        this.blockToIterate = blockToIterate;
        this.schema = schema;
        this.positionWithinBlock = -1;
    }
    BlockIterator.prototype.getCellAtPosition = function () {
        var position = CellPosition_1.CellPosition.blockAndPositionWithinBlockToPosition(this.blockToIterate, this.positionWithinBlock);
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
        return this.positionWithinBlock < CellPosition_1.CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
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
    BlockIterator.prototype.goAfterLast = function () {
        throw new Error("Not implemented yet!");
    };
    BlockIterator.prototype.goBeforeFirst = function () {
        throw new Error("Not implemented yet!");
    };
    return BlockIterator;
}());
exports.BlockIterator = BlockIterator;
