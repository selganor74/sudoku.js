"use strict";
var OrderedSchemaIterator = (function () {
    function OrderedSchemaIterator(schema) {
        this.schema = schema;
        this.position = -1;
        this.initialize();
    }
    OrderedSchemaIterator.prototype.initialize = function () {
        this.position = -1;
        this.iterated = [];
        this.initToBeIteratedArray();
    };
    OrderedSchemaIterator.prototype.initToBeIteratedArray = function () {
        this.toBeIterated = [];
        for (var i in this.schema.cells) {
            var currentElement = this.schema.cells[i];
            if (!currentElement.isConstrained)
                this.toBeIterated.push(currentElement);
        }
    };
    OrderedSchemaIterator.prototype.extractCellWithLeastPossibleValuesFromToBeIterated = function () {
        var found;
        var minimumTillNow = 10;
        var foundIndex;
        for (var i in this.toBeIterated) {
            var currentElement = this.toBeIterated[i];
            if (currentElement.numberOfPossibleValues < minimumTillNow) {
                found = currentElement;
                foundIndex = (new Number(i)).valueOf();
                minimumTillNow = currentElement.numberOfPossibleValues;
            }
        }
        this.toBeIterated.splice(foundIndex, 1);
        return found;
    };
    OrderedSchemaIterator.prototype.moveNext = function () {
        if (!this.hasNext())
            throw new Error("No elements left!");
        if (this.currentCell) {
            this.iterated.push(this.currentCell);
        }
        this.currentCell = this.extractCellWithLeastPossibleValuesFromToBeIterated();
        this.position = this.currentCell.position.linear;
        return this.currentCell;
    };
    OrderedSchemaIterator.prototype.movePrevious = function () {
        if (!this.hasPrevious())
            throw new Error("No elements left!");
        if (this.currentCell) {
            this.toBeIterated.push(this.currentCell);
        }
        this.currentCell = this.iterated.pop();
        this.position = this.currentCell.position.linear;
        return this.currentCell;
    };
    OrderedSchemaIterator.prototype.hasNext = function () {
        return this.toBeIterated.length > 0;
    };
    OrderedSchemaIterator.prototype.hasPrevious = function () {
        return this.iterated.length > 0;
    };
    OrderedSchemaIterator.prototype.hasCurrent = function () {
        return (!!this.currentCell);
    };
    OrderedSchemaIterator.prototype.getCurrent = function () {
        return this.currentCell;
    };
    OrderedSchemaIterator.prototype.goAfterLast = function () {
        this.position = Number.MAX_VALUE;
        if (this.currentCell) {
            this.iterated.push(this.currentCell);
        }
        this.iterated = this.iterated.concat(this.toBeIterated);
        this.currentCell = undefined;
    };
    OrderedSchemaIterator.prototype.goBeforeFirst = function () {
        this.initialize();
    };
    return OrderedSchemaIterator;
}());
exports.OrderedSchemaIterator = OrderedSchemaIterator;
