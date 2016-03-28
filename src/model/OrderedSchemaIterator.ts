module Sudoku {
    export class OrderedSchemaIterator implements ISchemaIterator<Cell> {
        // -1 means before first element;
        private position = -1;
        private iterated: Cell[];
        private toBeIterated: Cell[];
        private currentCell: Cell;

        constructor(private schema: Schema) {
            this.initialize();
        }

        private initialize() {
            this.position = -1;
            this.iterated = [];
            this.initToBeIteratedArray();
        }

        private initToBeIteratedArray() {
            this.toBeIterated = [];
            for (var i in this.schema.cells) {
                var currentElement = this.schema.cells[i];
                if (!currentElement.isConstrained)
                    this.toBeIterated.push(currentElement);
            }
        }

        private extractCellWithLeastPossibleValuesFromToBeIterated(): Cell {
            var found: Cell;
            // Initialize minimumTillNow to maximum number of possible values +1, so that first iteration will always be satisfied.
            var minimumTillNow: number = 10;
            var foundIndex: number;
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
        }

        public moveNext(): Cell {
            if (!this.hasNext())
                throw new Error("No elements left!");

            this.currentCell = this.extractCellWithLeastPossibleValuesFromToBeIterated();
            this.iterated.push(this.currentCell);
            this.position = this.currentCell.position.linear;
            return this.currentCell;
        }

        public movePrevious(): Cell {
            if (!this.hasPrevious())
                throw new Error("No elements left!");
            this.currentCell = this.iterated.pop();
            this.toBeIterated.push(this.currentCell);
            this.position = this.currentCell.position.linear;
            return this.currentCell;
        }

        public hasNext(): boolean {
            return this.toBeIterated.length > 0;
        }

        public hasPrevious(): boolean {
            return this.iterated.length > 0;
        }

        public hasCurrent(): boolean {
            return (this.currentCell != null && this.currentCell != undefined);
        }

        public getCurrent(): Cell {
            return this.currentCell;
        }

    }
}   