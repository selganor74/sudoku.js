module Sudoku {
    export class SchemaSolver {
        constructor(private schema: Schema) {
        }

        public solve() {
            var iterator = new LinearSchemaIterator(this.schema);
            this.recursiveSolver(iterator);
        }

        private recursiveSolver(iterator: ISchemaIterator<Cell>) {
            // console.log( this.schema.getNumberOfCombinations() );
            //debugger;
            if (!iterator.hasNext()) {
                console.log("Solution Found!");
                console.log(this.schema.dumpSchema());
                // throw new Error("Solution found !!!");
                debugger;
                if(iterator.hasCurrent())
                    iterator.getCurrent().setCurrentValue("");
                // iterator.movePrevious();
                return;
            }

            var cell = iterator.moveNext();
            // if cell is Constrained i simply step over this cell
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
            iterator.movePrevious();
            return;
        }
    }
} 

var schema = new Sudoku.Schema();
schema.createNew();

var solver = new Sudoku.SchemaSolver(schema);
solver.solve();