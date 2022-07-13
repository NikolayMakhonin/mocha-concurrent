import {CustomPromise} from '@flemist/async-utils'
// import {interceptConsole, CONSOLE_LEVELS} from '@flemist/web-logger'
import type {IRunner, ISuite, ITest} from './contracts'
import {TestFunc} from './contracts'

export function runFunc(
  runner: IRunner,
  suiteOrTest: ITest | ISuite,
  fn: TestFunc,
): Promise<void> {
  const timerPromise = new CustomPromise()

  let timer: any
  const context = {
    timeout(ms?: number) {
      if (typeof ms !== 'number') {
        return suiteOrTest.timeout()
      }

      suiteOrTest.timeout(ms)

      if (timer) {
        clearTimeout(timer)
      }

      if (ms) {
        timer = setTimeout(() => {
          timerPromise.reject(new Error(`Timeout: ${suiteOrTest.fullTitle(' > ')} (${ms} ms)`))
        }, ms)
      }
    },
  }

  const promise: Promise<void> = (async () => {
    // const unsubscribe = interceptConsole((level, handlerOrig) => {
    //   return (...args) => {
    //     if (suiteOrTest.type === 'test') {
    //       runner.suite = suiteOrTest.parent
    //       runner.test = suiteOrTest
    //     }
    //     else {
    //       runner.suite = suiteOrTest
    //       runner.test = null
    //     }
    //     handlerOrig(...args)
    //     return true
    //   }
    // }, CONSOLE_LEVELS)

    // try {
    if (fn.length) {
      await new Promise<void>((resolve, reject) => {
        fn.call(context, (err) => {
          if (err) {
            reject(err)
            return
          }
          resolve()
        })
      })
    }
    else {
      await fn.call(context)
    }
    // }
    // finally {
    //   unsubscribe()
    // }
  })()

  return Promise.race([
    timerPromise.promise,
    promise,
  ]) as any
}
