const proxyquire = require('proxyquire')
const expect = require('chai').expect
const sinon = require('sinon')
sinon.test = require('sinon-test')(sinon)
const ObjectId = require('mongoose').Types.ObjectId

const User = {
  findById: async (id) => ({}),
  find: async (ids) => ({})
}

describe('Store', () => {
  describe('#getOne', function () {
    it('should throw an error if param is not an ObjectId', async () => {
      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      try {
        await myStore.getOne('1234567890')
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err.message).to.equal('id is not an objectid !!')
        return
      }

      throw new Error("getOne didn't throw an error")
    })

    it('should get the user with an id', sinon.test(async function () {
      const userId = new ObjectId()

      const UserMock = this.mock(User)
      UserMock.expects('findById')
        .once()
        .withArgs(userId)
        .resolves({ _id: userId })

      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      const user = await myStore.getOne(userId)

      expect(user).to.have.property('_id')
      expect(user._id.toString()).to.equal(userId.toString())
    }))

    it('should get the user only once', sinon.test(async function () {
      const userId = new ObjectId()

      const UserMock = this.mock(User)
      UserMock.expects('findById')
        .once()
        .withArgs(userId)
        .resolves({ _id: userId })

      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      await myStore.getOne(userId)
      await myStore.getOne(userId)
    }))

    it('should get the user only once even if it is not resolved', sinon.test(async function () {
      const userId = new ObjectId()

      const UserMock = this.mock(User)
      UserMock.expects('findById')
        .once()
        .withArgs(userId)
        .resolves({ _id: userId })

      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      myStore.getOne(userId)
      const user = await myStore.getOne(userId)

      expect(user).to.have.property('_id')
      expect(user._id.toString()).to.equal(userId.toString())
    }))
  })

  describe('#get', function () {
    it('should throw an error if ids is not an Array', async () => {
      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      try {
        await myStore.get()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err.message).to.equal('ids is not an array')
        return
      }

      throw new Error("get didn't throw an error")
    })

    it('should throw an error if param is not an ObjectId', async () => {
      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      const usersIds = [new ObjectId(), '1234567890']

      try {
        await myStore.get(usersIds)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err.message).to.equal('index 1 is not an objectid !!')
        return
      }

      throw new Error("get didn't throw an error")
    })

    it.skip('should get the user with an id', sinon.test(async function () {
      const userId = new ObjectId()

      const UserMock = this.mock(User)
      UserMock.expects('findById')
        .once()
        .withArgs(userId)
        .resolves({ _id: userId })

      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      const user = await myStore.getOne(userId)

      expect(user).to.have.property('_id')
      expect(user._id.toString()).to.equal(userId.toString())
    }))

    it.skip('should get the user only once', sinon.test(async function () {
      const userId = new ObjectId()

      const UserMock = this.mock(User)
      UserMock.expects('findById')
        .once()
        .withArgs(userId)
        .resolves({ _id: userId })

      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      await myStore.getOne(userId)
      await myStore.getOne(userId)
    }))

    it.skip('should get the user only once even if it is not resolved', sinon.test(async function () {
      const userId = new ObjectId()

      const UserMock = this.mock(User)
      UserMock.expects('findById')
        .once()
        .withArgs(userId)
        .resolves({ _id: userId })

      const Store = proxyquire('../Store.js', { './User.js': User })

      const myStore = new Store()

      myStore.getOne(userId)
      const user = await myStore.getOne(userId)

      expect(user).to.have.property('_id')
      expect(user._id.toString()).to.equal(userId.toString())
    }))
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
