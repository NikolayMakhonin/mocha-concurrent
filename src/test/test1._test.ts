import {testNumber} from './testNumber'
import {delay} from '@flemist/async-utils'

describe('test1', function () {
  this.timeout(1000 + 1500 + 100 * 4 + 100)

  afterAll((done) => {
    setTimeout(done, 100)
  })

  afterEach((done) => {
    setTimeout(done, 100)
  })

  beforeEach((done) => {
    setTimeout(done, 100)
  })

  beforeAll((done) => {
    setTimeout(done, 100)
  })

  it('test1_1', function (done) {
    Promise.resolve().then(async() => {
      assert.strictEqual(global.testNumber, testNumber)
      await delay(1000)
      console.log(`test1_1: order=2`)
      await delay(1500)
      console.log(`test1_2: order=5`)
      done()
    })
  })

  describe('test1_nested', function() {
    xit('test1_x', async function (done) {
      assert.fail('test1_x')
    })
  })
})
