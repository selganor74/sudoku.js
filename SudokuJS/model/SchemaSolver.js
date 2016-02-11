var Sudoku;
(function (Sudoku) {
    var SchemaSolver = (function () {
        function SchemaSolver(schema) {
            this.schema = schema;
        }
        SchemaSolver.prototype.solve = function () {
            var iterator = new Sudoku.LinearSchemaIterator(this.schema);
            this.recursiveSolver(iterator);
        };
        SchemaSolver.prototype.recursiveSolver = function (iterator) {
            // console.log( this.schema.getNumberOfCombinations() );
            //debugger;
            if (!iterator.hasNext()) {
                console.log("Solution Found!");
                console.log(this.schema.dumpSchema());
                debugger;
                if (iterator.hasCurrent())
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
        };
        return SchemaSolver;
    })();
    Sudoku.SchemaSolver = SchemaSolver;
})(Sudoku || (Sudoku = {}));
var schema = new Sudoku.Schema();
schema.createNew();
var solver = new Sudoku.SchemaSolver(schema);
solver.solve();
//# sourceMappingURL=SchemaSolver.js.map