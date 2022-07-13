import type {IRunner} from './contracts'
import {RunnerConstants} from './contracts'
import kleur from 'kleur'

export class ReporterConsole {
  private _indents: number

  constructor(runner: IRunner) {
    this._indents = 0
    const stats = runner.stats

    runner
      .once(RunnerConstants.EVENT_RUN_BEGIN, () => {
        // console.log(kleur.cyan('Started: All Tests'))
      })
      .on(RunnerConstants.EVENT_SUITE_BEGIN, (suite) => {
        this.increaseIndent()
        // console.log(kleur.cyan(`Started: ${suite.fullTitle(' > ') || 'All Tests'}`))
      })
      .on(RunnerConstants.EVENT_TEST_PENDING, test => {
        console.log(kleur.gray(`Skipped: ${test.fullTitle(' > ')}`))
      })
      .on(RunnerConstants.EVENT_TEST_BEGIN, test => {
        console.log(kleur.blue(`Started: ${test.fullTitle(' > ')}`))
      })
      .on(RunnerConstants.EVENT_TEST_PASS, test => {
        console.log(kleur.green(`Passed: ${test.fullTitle(' > ')}`))
      })
      .on(RunnerConstants.EVENT_TEST_FAIL, (test, err) => {
        console.log(kleur.red(`Failed: ${test.fullTitle(' > ')}: ${err.message}`))
      })
      .on(RunnerConstants.EVENT_SUITE_END, () => {
        this.decreaseIndent()
      })
      .once(RunnerConstants.EVENT_RUN_END, () => {
        let message = `End: All Tests (${stats.duration} sec) ${stats.passes}/${stats.passes + stats.failures} ok`
        if (stats.failures) {
          message = kleur.red(message)
        }
        else {
          message = kleur.green(message)
        }
        console.log(kleur.bold(message))
      })
  }

  indent() {
    return Array(this._indents).join('  ')
  }

  increaseIndent() {
    this._indents++
  }

  decreaseIndent() {
    this._indents--
  }
}
