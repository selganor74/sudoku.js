module app {

    class SudokuSchemaController {
        public schemaRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        public schemaColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        public schema: Sudoku.Schema;

        constructor() { }

        public solve() {
            var solver = new Sudoku.SchemaSolver(this.schema);
            solver.solve(new Sudoku.OrderedSchemaIterator(this.schema));
        }

    }



    angular
        .module("sudoku.js")
        .directive("sudokuSchema", function () {
            return {
                scope: {
                    schema: "="
                },
                templateUrl: "angular-gui/sudoku-schema-directive/sudokuSchemaTemplate.html",
                controller: "sudokuSchemaController",
                controllerAs: "schemaCtrl",
                bindToController: true
            }
        })
        .controller("sudokuSchemaController", [SudokuSchemaController]);
}