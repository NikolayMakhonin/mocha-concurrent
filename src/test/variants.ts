import {createTestVariants} from '@flemist/test-variants'
import {runTests} from 'src/bdd/runTests'

describe('', function () {
  const testVariants = createTestVariants(({

  }: {

  }) => {
    runTests({
      watch       : false,
      timeout     : 100,
      filesGlobs  : ['src/**/*._test.*'],
      reporterPath: null,
      grep        : null,
    })
  })

  it('', function () {

  })
})
