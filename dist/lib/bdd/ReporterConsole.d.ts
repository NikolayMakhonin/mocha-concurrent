import type { IRunner } from './contracts';
export declare class ReporterConsole {
    private _indents;
    constructor(runner: IRunner);
    indent(): string;
    increaseIndent(): void;
    decreaseIndent(): void;
}
