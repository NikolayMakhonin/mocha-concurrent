import {testNumber} from './testNumber'
import {delay} from '@flemist/async-utils'

describe('test2', function () {
  this.timeout(100 * 4 + 100)

  afterAll(async () => {
    await delay(100)
  })

  afterEach(async () => {
    await delay(100)
  })

  beforeEach(async () => {
    await delay(100)
  })

  beforeAll(async () => {
    await delay(100)
  })

  it('test2_1', async function () {
    this.timeout(500 + 1500 + 100)
    assert.strictEqual(global.testNumber, testNumber)
    await delay(500)
    console.log(`test2_1: order=1`)
    await delay(1500)
    console.log(`test2_2: order=4`)
  })

  xit('test2_x', async function () {
    assert.fail('test2_x')
  })
})
