import {testNumber} from './testNumber'
import {delay} from '@flemist/async-utils'

afterAll(async (done) => {
  await delay(100)
  done()
})

afterEach(async (done) => {
  await delay(100)
  done()
})

beforeEach(async (done) => {
  await delay(100)
  done()
})

beforeAll(async (done) => {
  await delay(100)
  done()
})

it('test3_1', async function (done) {
  this.timeout(1500 + 1500 + 100)
  assert.strictEqual(global.testNumber, testNumber)
  await delay(1500)
  console.log(`test3_1: order=3`)
  await delay(1500)
  console.log(`test3_2: order=6`)
  done()
})

xit('test3_x', async function () {
  assert.fail('tes3_x')
})

