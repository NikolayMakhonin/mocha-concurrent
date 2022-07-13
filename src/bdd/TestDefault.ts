import type {ISuite, ITest} from './contracts'
import {TestConstants, TestFunc} from './contracts'

export class TestDefault implements ITest {
  constructor(file: string, parent: ISuite, title: string, fn: TestFunc, skip: boolean) {
    this.title = title
    this.fn = fn
    this.body = (fn || '').toString()
    this.async = !!(fn && fn.length)
    this.sync = !this.async
    this.skip = skip
    this.parent = parent
    this.file = file
  }

  readonly type = 'test'
  readonly title: string
  readonly fn: TestFunc
  readonly body: string
  readonly async: boolean
  readonly sync: boolean
  readonly skip: boolean
  private _timeout: number = 2000
  readonly parent: ISuite | undefined = void 0
  readonly file: string | undefined = void 0

  err: Error | undefined = void 0 // added by reporters
  duration: number | undefined = void 0
  pending: boolean = false
  state: 'failed' | 'passed' | 'pending' | undefined = void 0
  timedOut: boolean = false

  timeout(): number
  timeout(ms: number): this
  timeout(ms?: number): number | this {
    if (!arguments.length) {
      return this._timeout
    }

    this._timeout = ms
    return this
  }

  isPending(): boolean {
    return this.pending || (this.parent && this.parent.isPending())
  }

  isFailed(): boolean {
    return !this.isPending() && this.state === TestConstants.STATE_FAILED
  }

  isPassed(): boolean {
    return !this.isPending() && this.state === TestConstants.STATE_PASSED
  }

  fullTitle(separator?: string): string {
    return this.titlePath().join(separator || ' ')
  }

  titlePath(): string[] {
    return this.parent.titlePath().concat([this.title])
  }

  slow() {
    return 75
  }

  reset() {
    this.timedOut = false
    this.pending = false
    this.state = void 0
    this.err = void 0
    this._timeout = 2000
  }
}
