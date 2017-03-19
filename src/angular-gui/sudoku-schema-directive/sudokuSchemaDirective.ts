import {Schema, SchemaSolver, OrderedSchemaIterator}  from "../../model";

class SudokuSchemaController {
    public schemaRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public schemaColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public schema: Schema;

    constructor() { }

    public solve() {
        var solver = new SchemaSolver(this.schema, new OrderedSchemaIterator(this.schema));
        solver.moveNext();
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