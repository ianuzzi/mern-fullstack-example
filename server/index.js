////require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()
///////////////////////////////////////////////////////////////////////////////
// EXPRESS
///////////////////////////////////////////////////////////////////////////////

////const express = require('express')
import express from 'express'
const app = express()

////const bodyParser = require('body-parser')
import bodyParser from 'body-parser'
app.use(bodyParser.json())

//const cors = require('cors')
//app.use(cors())

////const auth = require('./middleware/auth')
import auth from './middleware/auth.js'

///////////////////////////////////////////////////////////////////////////////
// MONGOOSE
///////////////////////////////////////////////////////////////////////////////

////const mongoose = require('mongoose')
import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const connection = mongoose.connection

connection.once('open', () => {
	console.log('MongoDB connection established successfully')
})

///////////////////////////////////////////////////////////////////////////////
// INCLUDE SOME TEST ROUTES
///////////////////////////////////////////////////////////////////////////////

////const TestData = require('./components-test/testpaths')
import { flatTestData, dbTestData } from './components-test/testpaths.js'

////TestData.flatTestData(app)
flatTestData(app)
////TestData.dbTestData(app)
dbTestData(app)

///////////////////////////////////////////////////////////////////////////////
// RANDOM TEST JUNK
///////////////////////////////////////////////////////////////////////////////

app.get('/', auth, (req, res) => {
	res.status(200).send('ok')
})

///////////////////////////////////////////////////////////////////////////////
// AUTH ROUTES
///////////////////////////////////////////////////////////////////////////////
////app.use('/api/users', require('./routes/users'))
////app.use('/api/auth', require('./routes/userAuth'))
import apiUsers from './routes/users.js'
import apiAuth from './routes/userAuth.js'

app.use('/api/users', apiUsers)
app.use('/api/auth', apiAuth)

///////////////////////////////////////////////////////////////////////////////
// INSTANTIATE THE SERVER
///////////////////////////////////////////////////////////////////////////////

const port = 5000

app.listen(port, function () {
	console.log(`Example app listening on port ${port}`)
})
