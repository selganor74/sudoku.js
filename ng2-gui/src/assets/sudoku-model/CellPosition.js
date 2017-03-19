"use strict";
var CellPosition = (function () {
    function CellPosition(linearPosition) {
        this._linear = linearPosition;
        this._block = CellPosition.positionToBlock(linearPosition);
        var xy = CellPosition.positionToXy(linearPosition);
        this._x = xy.x;
        this._y = xy.y;
    }
    Object.defineProperty(CellPosition.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellPosition.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellPosition.prototype, "block", {
        get: function () { return this._block; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellPosition.prototype, "linear", {
        get: function () { return this._linear; },
        enumerable: true,
        configurable: true
    });
    CellPosition.positionToXy = function (position) {
        var toReturn = { x: 0, y: 0 };
        toReturn.x = position % CellPosition.NUMBER_OF_CELLS_PER_SIDE;
        toReturn.y = Math.floor(position / CellPosition.NUMBER_OF_CELLS_PER_SIDE);
        return toReturn;
    };
    CellPosition.xyToPosition = function (xy) {
        var position = xy.y * CellPosition.NUMBER_OF_CELLS_PER_SIDE + xy.x;
        return position;
    };
    CellPosition.blockAndPositionWithinBlockToPosition = function (block, positionInBlock) {
        var offsetX = (block % 3) * 3;
        var offsetY = Math.floor(block / 3) * 3;
        var positionX = (positionInBlock % 3);
        var positionY = Math.floor(positionInBlock / 3);
        var position = CellPosition.xyToPosition({ x: offsetX + positionX, y: offsetY + positionY });
        return position;
    };
    CellPosition.positionToBlock = function (position) {
        var xy = CellPosition.positionToXy(position);
        var xComponent = Math.floor(xy.x / 3);
        var yComponent = Math.floor(xy.y / 3);
        var block = yComponent * 3 + xComponent;
        return block;
    };
    CellPosition.NUMBER_OF_CELLS_PER_SIDE = 9;
    return CellPosition;
}());
exports.CellPosition = CellPosition;
