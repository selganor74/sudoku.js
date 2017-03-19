"use strict";
var CellPosition_1 = require("./CellPosition");
var LinearSchemaIterator = (function () {
    function LinearSchemaIterator(schema) {
        this.schema = schema;
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
        return this.position < CellPosition_1.CellPosition.NUMBER_OF_CELLS_PER_SIDE * CellPosition_1.CellPosition.NUMBER_OF_CELLS_PER_SIDE - 1;
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
    LinearSchemaIterator.prototype.goAfterLast = function () {
    };
    LinearSchemaIterator.prototype.goBeforeFirst = function () {
    };
    return LinearSchemaIterator;
}());
exports.LinearSchemaIterator = LinearSchemaIterator;
