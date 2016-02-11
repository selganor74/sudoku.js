module Sudoku {
    export class SchemaSolver {

        private solutionsFound: number = 0;
        private iterations: number = 0;
        private lastSolutionIterations: number = 0;

        constructor(private schema: Schema) {
        }

        public solve(iterator: ISchemaIterator<Cell> ) {
            this.recursiveSolver(iterator);
        }

        private recursiveSolver(iterator: ISchemaIterator<Cell>) {
            // console.log( this.schema.getNumberOfCombinations() );
            //debugger;
            this.iterations++;
            // Case 1: We have no more cells to explore... we found a solution !!!
            if (!iterator.hasNext()) {
                console.log("Solution Found! After: " + ( this.iterations - this.lastSolutionIterations) );
                this.lastSolutionIterations = this.iterations;
                console.log(this.schema.dumpSchema());
                // throw new Error("Solution found !!!");
                this.solutionsFound++;
                console.log("Solutions found 'till now: " + this.solutionsFound);

                var currentCell = iterator.getCurrent();
                if (!currentCell.isConstrained)
                    currentCell.setCurrentValue("");

                return;
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
                return;
            }
            iterator.movePrevious();
            return;
        }
    }
} 
