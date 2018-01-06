const User = require('./User.js')
const ObjectId = require('mongoose').Types.ObjectId

class Store {
  constructor () {
    this.users = []
    this.promises = []
    this.waitingIds = []
  }

  async getOne (id) {
    if (!ObjectId.isValid(id)) {
      throw new Error('id is not an objectid !!')
    }

    const index = this.waitingIds.indexOf(id.toString())

    if (index >= 0) {
      return this.promises[index]
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id.toString() === id.toString()) {
        return this.users[i]
      }
    }

    const promise = User.findById(id)
    .then((user) => {
      this.users.push(user)
      const index = this.waitingIds.indexOf(user._id.toString())
      this.waitingIds.splice(index, 1)
      this.promises.splice(index, 1)
      return user
    })

    this.waitingIds.push(id.toString())
    this.promises.push(promise)
    return promise
  }

  async get (ids) {
    if (!(ids instanceof Array)) {
      throw new Error('ids is not an array')
    }

    for (let i = 0; i < ids.length; i++) {
      if (!ObjectId.isValid(ids[i])) {
        throw new Error(`index ${i} is not an objectid !!`)
      }
    }

    const promise = User.find({_id: {$in: ids}})
    .then((users) => {
      this.users = this.users.concat(users)
      return users
    })
    
    // If we wanted to to this completely, we should add the promise (ids.length) times
    // to this.promises & this.waitingIds so that even if the operation is done with get,
    // we stay consistent
    
    return promise
  }
}

module.exports = Store
