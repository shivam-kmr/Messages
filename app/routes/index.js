const messeges_routes = require('./messeges_routes')
const conversations = require('./conversations')
const contacts = require('./contacts')

module.exports = function (app,db) {
    messeges_routes(app, db)
    contacts(app, db)
    conversations(app, db)
}