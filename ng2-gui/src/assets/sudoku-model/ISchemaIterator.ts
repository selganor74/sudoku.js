export interface ISchemaIterator<T> {
    moveNext(): T;
    movePrevious(): T;
    hasNext(): boolean;
    hasPrevious(): boolean;
    hasCurrent(): boolean;
    getCurrent(): T;
    goAfterLast(): void;
    goBeforeFirst(): void;
}