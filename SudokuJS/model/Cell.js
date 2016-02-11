var Sudoku;
(function (Sudoku) {
    var Cell = (function () {
        function Cell(linearPosition) {
            // A value is available when it ha acounter of 0
            this.possibleValues = {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 0,
                "7": 0,
                "8": 0,
                "9": 0
            };
            this._numberOfPossibleValues = 9;
            this._isConstrained = false;
            this._currentValue = "";
            this._position = new Sudoku.CellPosition(linearPosition);
        }
        Object.defineProperty(Cell.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "numberOfPossibleValues", {
            get: function () {
                return this._numberOfPossibleValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isConstrained", {
            get: function () {
                return this._isConstrained;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.getPossibleValues = function () {
            var toReturn = [];
            for (var i in this.possibleValues) {
                if (this.possibleValues[i] === 0)
                    toReturn.push(i);
            }
            return toReturn;
        };
        Object.defineProperty(Cell.prototype, "currentValue", {
            get: function () {
                return this._currentValue;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.setCellValue = function (currentValue) {
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
        };
        Cell.prototype.setCurrentValue = function (currentValue) {
            if (this.isConstrained)
                throw new Error("Can't set value on a constrained Cell!");
            this.setCellValue(currentValue);
        };
        Cell.prototype.setConstrainedValue = function (value) {
            if (this.possibleValues[value] !== 0)
                throw new Error("Invalid constrained value for this cell!");
            this._isConstrained = true;
            this.setCellValue(value);
        };
        Cell.prototype.addPossibleValue = function (possibleValue) {
            this.possibleValues[possibleValue]--;
            if (this.possibleValues[possibleValue] < 0)
                throw new Error("Lock counter can't go negative!");
            if (this.possibleValues[possibleValue] === 0)
                this._numberOfPossibleValues++;
        };
        Cell.prototype.removePossibleValue = function (possibleValue) {
            if (this.possibleValues[possibleValue] === 0)
                this._numberOfPossibleValues--;
            this.possibleValues[possibleValue]++;
            if (this.possibleValues[possibleValue] > 3)
                throw new Error("Lock counter can't be greater than 3!");
        };
        Cell.prototype.addPossibleValueToArrayOfCells = function (possibleValue, array) {
            for (var i in array) {
                array[i].addPossibleValue(possibleValue);
            }
        };
        Cell.prototype.removePossibleValueToArrayOfCells = function (possibleValue, array) {
            for (var i in array) {
                array[i].removePossibleValue(possibleValue);
            }
        };
        return Cell;
    })();
    Sudoku.Cell = Cell;
})(Sudoku || (Sudoku = {}));
//# sourceMappingURL=Cell.js.map