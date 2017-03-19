"use strict";
var IteratorStackElement = (function () {
    function IteratorStackElement(cell) {
        this.cell = cell;
        if (cell.isConstrained) {
            console.log("CAN'T CREATE ITERATOR ON CONSTRAINED CELL");
            throw new Error("Cannot initialize IteratorStackElement with constrained cell");
        }
        this.possibleValues = cell.getPossibleValues();
        this.currentValueIndex = -1;
    }
    IteratorStackElement.prototype.moveNext = function () {
        if (this.cell.isConstrained)
            return;
        if (this.currentValueIndex < this.possibleValues.length - 1) {
            this.currentValueIndex++;
            this.cell.setCurrentValue(this.possibleValues[this.currentValueIndex]);
        }
        else {
            throw new Error("No More Elements!");
        }
    };
    return IteratorStackElement;
}());
var SchemaSolver = (function () {
    function SchemaSolver(schema, iterator) {
        this.schema = schema;
        this.iterator = iterator;
        this.solutionsFound = 0;
        this.iterations = 0;
        this.lastSolutionIterations = 0;
        this.hasMoreSolutions = true;
        this.FOUND_SOLUTION = "Found solution !!!";
        this.iteratorsStack = [];
    }
    SchemaSolver.prototype.moveNext = function () {
        try {
            this.nonRecursiveSolver();
        }
        catch (e) {
        }
    };
    SchemaSolver.prototype.hasNext = function () {
        return this.hasMoreSolutions;
    };
    SchemaSolver.prototype.getSolutionsFound = function () {
        return this.solutionsFound;
    };
    SchemaSolver.prototype.nonRecursiveSolver = function () {
        var nextStep = "GoAhead";
        var cell;
        var currentCellValuesIterator;
        var solutionFound = false;
        nextStep = "GoAhead";
        if (this.solutionsFound > 0) {
            nextStep = "StepBack";
        }
        console.log("Starting algorithm with " + nextStep);
        while (!solutionFound && this.hasMoreSolutions) {
            switch (nextStep) {
                case "GoAhead":
                    console.log("Going ahead.");
                    do {
                        if (!this.iterator.hasNext()) {
                            console.log("No more cells from iterator. Found a solution !!!");
                            solutionFound = true;
                            this.solutionsFound++;
                            this.iterator.goAfterLast();
                            break;
                        }
                        cell = this.iterator.moveNext();
                    } while (cell.isConstrained && !solutionFound);
                    if (solutionFound) {
                        continue;
                    }
                    console.log("Got new cell from iterator");
                    console.log("Building IteratorStackElement");
                    currentCellValuesIterator = new IteratorStackElement(cell);
                    break;
                case "StepBack":
                    console.log("Stepping back");
                    do {
                        if (!this.iterator.hasPrevious()) {
                            console.log("Can't step back anymore. Found all solutions.");
                            this.hasMoreSolutions = false;
                            break;
                        }
                        var currentCell = this.iterator.getCurrent();
                        if (currentCell && !currentCell.isConstrained) {
                            currentCell.setCurrentValue("");
                        }
                        cell = this.iterator.movePrevious();
                    } while (cell.isConstrained && this.hasMoreSolutions);
                    if (!this.hasMoreSolutions) {
                        continue;
                    }
                    console.log("Stepped back to cell " + cell.position.linear);
                    console.log("Got previous cell from iterator.");
                    console.log("Popping IteratorStackElement from stack.");
                    currentCellValuesIterator = this.iteratorsStack.pop();
                    console.log("Popped iterator for cell " + currentCellValuesIterator.cell.position.linear);
                    if (cell != currentCellValuesIterator.cell) {
                        console.log("Should never happen! Expecting cell " + cell.position.linear + " got " + currentCellValuesIterator.cell.position.linear);
                        throw new Error("ASSERT ERROR: Cell from iterator backstep is not the same as stack!");
                    }
                    break;
            }
            try {
                console.log("Taking next value from current cell");
                currentCellValuesIterator.moveNext();
                console.log("Got next element, we can go on. Pushing iterator for cell " + currentCellValuesIterator.cell.position.linear);
                this.iteratorsStack.push(currentCellValuesIterator);
                nextStep = "GoAhead";
            }
            catch (e) {
                console.log("Unable to get next value. Need to backtrack!");
                nextStep = "StepBack";
            }
        }
    };
    SchemaSolver.prototype.recursiveSolver = function (iterator) {
        this.iterations++;
        if (!iterator.hasNext()) {
            console.log("Solution Found! After: " + (this.iterations - this.lastSolutionIterations));
            this.lastSolutionIterations = this.iterations;
            console.log(this.schema.dumpSchema());
            this.solutionsFound++;
            console.log("Solutions found 'till now: " + this.solutionsFound);
            throw new Error("Solution found !!!");
        }
        var cell = iterator.moveNext();
        if (cell.isConstrained) {
            this.recursiveSolver(iterator);
            iterator.movePrevious();
            return;
        }
        var cellsPossibleValues = cell.getPossibleValues();
        for (var i in cellsPossibleValues) {
            cell.setCurrentValue(cellsPossibleValues[i]);
            this.recursiveSolver(iterator);
        }
        cell.setCurrentValue("");
        if (!iterator.hasPrevious()) {
            console.log("Exploration Completed with " + this.solutionsFound + " solutions found.");
            this.hasMoreSolutions = false;
            return;
        }
        iterator.movePrevious();
        return;
    };
    return SchemaSolver;
}());
exports.SchemaSolver = SchemaSolver;
