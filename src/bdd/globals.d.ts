import type {Globals} from './register'

declare global {
    const assert: Globals['assert']
    const it: Globals['it']
    const describe: Globals['describe']
    const xdescribe: Globals['xdescribe']
    const xit: Globals['xit']
    const beforeAll: Globals['beforeAll']
    const afterAll: Globals['afterAll']
    const beforeEach: Globals['beforeEach']
    const afterEach: Globals['afterEach']
}
