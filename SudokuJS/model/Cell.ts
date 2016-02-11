module Sudoku {
    export class Cell {

        private _position: CellPosition;
        get position(): CellPosition { return this._position; }

        constructor(linearPosition: number) {
            this._position = new CellPosition(linearPosition);
        }

        // A value is available when it ha acounter of 0
        private possibleValues: { [value: string]: number } = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
        }

        private _numberOfPossibleValues: number = 9;
        get numberOfPossibleValues(): number { return this._numberOfPossibleValues; }

        private _isConstrained: boolean = false;
        get isConstrained(): boolean { return this._isConstrained; }

        public inMyRow: Cell[];
        public inMyColumn: Cell[];
        public inMyBlock: Cell[];

        public getPossibleValues(): string[] {
            var toReturn: string[] = [];
            for (var i in this.possibleValues) {
                if (this.possibleValues[i] === 0)
                    toReturn.push(i);
            }
            return toReturn;
        }

        private _currentValue: string = "";
        get currentValue(): string { return this._currentValue; }

        private setCellValue(currentValue: string) {
            // When cell already has a currentValue set, we should re-add it to the possible values in the row, column, and block of the cell.
            if (this._currentValue != "") {
                this.addPossibleValueToArrayOfCells(this._currentValue, this.inMyRow);
                this.addPossibleValueToArrayOfCells(this._currentValue, this.inMyColumn);
                this.addPossibleValueToArrayOfCells(this._currentValue, this.inMyBlock);
            }
            if (currentValue != "") {
                this.removePossibleValueToArrayOfCells(currentValue, this.inMyRow);
                this.removePossibleValueToArrayOfCells(currentValue, this.inMyColumn);
                this.removePossibleValueToArrayOfCells(currentValue, this.inMyBlock);
            }
            this._currentValue = currentValue;
        }

        public setCurrentValue(currentValue: string) {
            if (this.isConstrained) throw new Error("Can't set value on a constrained Cell!");
            this.setCellValue(currentValue);
        }

        public setConstrainedValue(value: string) {
            if (this.possibleValues[value] !== 0)
                throw new Error("Invalid constrained value for this cell!");
            this._isConstrained = true;
            this.setCellValue(value);
        }

        private addPossibleValue(possibleValue: string) {

            this.possibleValues[possibleValue]--;

            if (this.possibleValues[possibleValue] === 0)
                this._numberOfPossibleValues++;
        }

        private removePossibleValue(possibleValue: string) {

            if (this.possibleValues[possibleValue] === 0)
                this._numberOfPossibleValues--;

            this.possibleValues[possibleValue]++;
        }

        private addPossibleValueToArrayOfCells(possibleValue: string, array: Cell[]): void {
            for (var i in array) {
                array[i].addPossibleValue(possibleValue);
            }
        }

        private removePossibleValueToArrayOfCells(possibleValue: string, array: Cell[]): void {
            for (var i in array) {
                array[i].removePossibleValue(possibleValue);
            }
        }
    }
} 