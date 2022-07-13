import { CustomPromise } from '@flemist/async-utils';

function runFunc(runner, suiteOrTest, fn) {
    const timerPromise = new CustomPromise();
    let timer;
    const context = {
        timeout(ms) {
            if (typeof ms !== 'number') {
                return suiteOrTest.timeout();
            }
            suiteOrTest.timeout(ms);
            if (timer) {
                clearTimeout(timer);
            }
            if (ms) {
                timer = setTimeout(() => {
                    timerPromise.reject(new Error(`Timeout: ${suiteOrTest.fullTitle(' > ')} (${ms} ms)`));
                }, ms);
            }
        },
    };
    const promise = (async () => {
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
            await new Promise((resolve, reject) => {
                fn.call(context, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        }
        else {
            await fn.call(context);
        }
        // }
        // finally {
        //   unsubscribe()
        // }
    })();
    return Promise.race([
        timerPromise.promise,
        promise,
    ]);
}

export { runFunc };
