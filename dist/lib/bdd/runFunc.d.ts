import type { IRunner, ISuite, ITest } from './contracts';
import { TestFunc } from './contracts';
export declare function runFunc(runner: IRunner, suiteOrTest: ITest | ISuite, fn: TestFunc): Promise<void>;
