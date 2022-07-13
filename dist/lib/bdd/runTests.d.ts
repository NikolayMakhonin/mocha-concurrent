export declare function runTests({ watch, timeout, reporterPath, filesGlobs, grep, }: {
    watch: boolean;
    timeout: number;
    reporterPath: string;
    filesGlobs: string[];
    grep: RegExp;
}): Promise<void>;
