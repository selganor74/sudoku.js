module app {

    class MainController {

        public schema: Sudoku.Schema;

        constructor(private $scope: ng.IScope) {
            var schema = new Sudoku.Schema();
            schema.createNew();
            
            schema.getCellAtXyPosition(0, 8).setConstrainedValue("1");
            schema.getCellAtXyPosition(1, 7).setConstrainedValue("2");
            schema.getCellAtXyPosition(2, 6).setConstrainedValue("3");
            schema.getCellAtXyPosition(3, 5).setConstrainedValue("4");
            schema.getCellAtXyPosition(4, 4).setConstrainedValue("5");
            schema.getCellAtXyPosition(5, 3).setConstrainedValue("6");
            schema.getCellAtXyPosition(6, 2).setConstrainedValue("7");
            schema.getCellAtXyPosition(7, 1).setConstrainedValue("8");
            schema.getCellAtXyPosition(8, 0).setConstrainedValue("9");

            var solver = new Sudoku.SchemaSolver(schema);

            this.schema = schema;
            // runs the solver in a background thread. ?
            //var iterator = new Sudoku.OrderedSchemaIterator(schema);
            //window.setTimeout(solver.solve( iterator ), 0);
        }
    }

    angular
        .module("sudoku.js")
        .controller("mainController", ["$scope", MainController]);
}