import express from 'express'
const { convert } = require('convert-svg-to-png')
var crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// React Components
import React from 'react'
import RDS from 'react-dom/server'
import Avataaars from 'avataaars'

const app = express()

app.get('/', async (req, res) => {
	const appString = RDS.renderToString(<Avataaars {...req.query} />)

	res.writeHead(200, {
		'Content-Type': 'image/svg+xml',
	})
	res.end(appString)
})

const getHash = (req) => {
	return crypto.createHash('md5').update(req.path + '-' + JSON.stringify(req.query)).digest('hex')
}

app.get('/png/:width?', async (req, res) => {
	const hash = getHash(req)

	const fileFolder = path.resolve(__dirname, 'generated')
	const fileName = `${hash}.png`
	const filePath = path.resolve(fileFolder, fileName)

	res.set('Content-Type', 'image/png')

	fs.readFile(filePath, async (err, data) => {
		if (err) {
			console.log('Generating new avatar')

			const appString = RDS.renderToString(<Avataaars {...req.query} />)

			const png = await convert(appString, {
				width: parseInt(req.params.width || 500, 10),
				puppeteer: {
					args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
				},
			})

			if (!await fs.existsSync(fileFolder)) await fs.mkdirSync(fileFolder, '0777', true)

			await fs.writeFileSync(filePath, png, 'binary')

			res.end(png)
			return
		}

		console.log(`Returning pre-generated file [${fileName}]`)
		res.end(data)
	})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})

module.exports = app
