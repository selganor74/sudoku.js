import {Schema} from "./Schema";
import {ISchemaIterator} from "./ISchemaIterator";
import {Cell} from "./Cell";

class IteratorStackElement {
    public currentValueIndex: number;
    public possibleValues: string[];

    constructor(
        public cell: Cell
    ) {
        if (cell.isConstrained) {
            console.log("CAN'T CREATE ITERATOR ON CONSTRAINED CELL");
            throw new Error("Cannot initialize IteratorStackElement with constrained cell");
        }
        this.possibleValues = cell.getPossibleValues();
        this.currentValueIndex = -1;
    }

    public moveNext() {
        if (this.cell.isConstrained) return;

        if (this.currentValueIndex < this.possibleValues.length - 1) {
            this.currentValueIndex++;
            this.cell.setCurrentValue(this.possibleValues[this.currentValueIndex]);
        } else {
            throw new Error("No More Elements!");
        }
    }

}
export class SchemaSolver {

    private solutionsFound: number = 0;
    private iterations: number = 0;
    private lastSolutionIterations: number = 0;
    private hasMoreSolutions: boolean = true;
    private FOUND_SOLUTION = "Found solution !!!";
    private iteratorsStack: IteratorStackElement[] = []; // It's a stack o f possible iterators for each cell visited by the cell iterator.

    constructor(
        private schema: Schema,
        private iterator: ISchemaIterator<Cell>) {
    }


    public moveNext() {
        try {
            // this.recursiveSolver(this.iterator);
            this.nonRecursiveSolver();
        } catch (e) {
            // if (e.message === this.FOUND_SOLUTION) {}
        }
    }

    public hasNext() {
        return this.hasMoreSolutions;
    }

    public getSolutionsFound() {
        return this.solutionsFound;
    }

    private nonRecursiveSolver() {
        let nextStep: "GoAhead" | "StepBack" = "GoAhead";
        let cell: Cell;
        let currentCellValuesIterator: IteratorStackElement;
        let solutionFound: boolean = false;

        nextStep = "GoAhead";
        if (this.solutionsFound > 0) {
            nextStep = "StepBack";
        }
        console.log("Starting algorithm with " + nextStep)
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
                        let currentCell = this.iterator.getCurrent();
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
                    // Must happen that cell from the iterator backstep is the same cell in the iterators stack
                    if (cell != currentCellValuesIterator.cell) {
                        console.log("Should never happen! Expecting cell " + cell.position.linear + " got " + currentCellValuesIterator.cell.position.linear );
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
            } catch (e) {
                console.log("Unable to get next value. Need to backtrack!");
                nextStep = "StepBack"
            }
        }
    }

    private recursiveSolver(iterator: ISchemaIterator<Cell>) {
        // console.log( this.schema.getNumberOfCombinations() );
        //debugger;
        this.iterations++;
        // Case 1: We have no more cells to explore... we found a solution !!!
        if (!iterator.hasNext()) {
            console.log("Solution Found! After: " + (this.iterations - this.lastSolutionIterations));
            this.lastSolutionIterations = this.iterations;
            console.log(this.schema.dumpSchema());

            this.solutionsFound++;
            console.log("Solutions found 'till now: " + this.solutionsFound);

            throw new Error("Solution found !!!");
            /*
                            var currentCell = iterator.getCurrent();
                            if (!currentCell.isConstrained)
                                currentCell.setCurrentValue("");
            
                            return;
            */
        }

        // Case 2: We have another cell to Explore so we get it...
        var cell = iterator.moveNext();

        // Case 2a: if cell is Constrained i simply step over this cell
        if (cell.isConstrained) {
            this.recursiveSolver(iterator);
            iterator.movePrevious();
            return;
        }

        // Case 2b: The Cell is not constrained so I can cycle through its possible values.
        var cellsPossibleValues = cell.getPossibleValues();
        for (var i in cellsPossibleValues) {
            cell.setCurrentValue(cellsPossibleValues[i]);
            this.recursiveSolver(iterator);
        }

        // When we have done exploring all the possible values for this cell,
        // we simply clear it, e make a step back, to go on exploring!
        cell.setCurrentValue("");
        if (!iterator.hasPrevious()) {
            // RING THE Bell! We have finished exploring all the possible solutions.
            console.log("Exploration Completed with " + this.solutionsFound + " solutions found.");
            this.hasMoreSolutions = false;
            return;
        }
        iterator.movePrevious();
        return;
    }
}