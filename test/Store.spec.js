const proxyquire = require('proxyquire')
const expect = require('chai').expect
const sinon = require('sinon')
sinon.test = require('sinon-test')(sinon)

describe('Store', () => {
  it('should blablabla', async () => {
    const Store = proxyquire('../Store.js', {})

    const store = new Store()

    expect(store).to.be.instanceOf(Store)
    return
  })
})

/**
const User = {
  // methods
}

const mongoose = {
  model: () => User
}

const mock = this.mock(User)
mock.expects('find').once()
  .withArgs({...})
  .resolves(list)
**/
