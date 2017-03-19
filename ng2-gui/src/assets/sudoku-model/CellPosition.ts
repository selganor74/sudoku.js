export class CellPosition {
    public static NUMBER_OF_CELLS_PER_SIDE = 9;

    private _x: number;
    get x(): number { return this._x }

    private _y: number;
    get y(): number { return this._y }

    private _block: number;
    get block(): number { return this._block }

    private _linear: number;
    get linear(): number { return this._linear }

    constructor(linearPosition: number) {
        this._linear = linearPosition;
        this._block = CellPosition.positionToBlock(linearPosition);
        var xy = CellPosition.positionToXy(linearPosition);
        this._x = xy.x;
        this._y = xy.y;
    }

    public static positionToXy(position: number): { x: number; y: number } {
        var toReturn = { x: 0, y: 0 };
        toReturn.x = position % CellPosition.NUMBER_OF_CELLS_PER_SIDE
        toReturn.y = Math.floor(position / CellPosition.NUMBER_OF_CELLS_PER_SIDE);
        return toReturn;
    }

    public static xyToPosition(xy: { x: number; y: number }) {
        var position = xy.y * CellPosition.NUMBER_OF_CELLS_PER_SIDE + xy.x;
        return position;
    }

    public static blockAndPositionWithinBlockToPosition(block: number, positionInBlock: number): number {
        var offsetX = (block % 3) * 3;
        var offsetY = Math.floor(block / 3) * 3;
        var positionX = (positionInBlock % 3);
        var positionY = Math.floor(positionInBlock / 3);
        var position = CellPosition.xyToPosition({ x: offsetX + positionX, y: offsetY + positionY });
        return position;
    }

    public static positionToBlock(position: number) {
        var xy = CellPosition.positionToXy(position);
        var xComponent = Math.floor(xy.x / 3);
        var yComponent = Math.floor(xy.y / 3);
        var block = yComponent * 3 + xComponent;
        return block;
    }
}