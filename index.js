const url = require('url')
const path = require('path')
const fs = require('fs')
const fileExists = require('file-exists')

const BASE = 'public'
const HTML = 'index.html'

module.exports = async (req, res) => {
	const reqPath = url.parse(req.url).pathname
	let fileName = path.join(process.cwd(), `${BASE}/${reqPath}`)
	const exists = await fileExists(fileName)
	if (exists === false) {
		fileName = path.join(process.cwd(), `${BASE}/${HTML}`)
	}
	const body = fs.readFileSync(fileName)
	res.end(body)
}
