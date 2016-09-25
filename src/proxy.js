const url = require('url');
const express = require('express');
const request = require('request');
const config = require('./config');

module.exports = function (req, res) {
	const _url = req.params.url;

	if (!_url) {
		return;
	}

	request({
		url: _url + url.parse(req.url, true).search,
		encoding: null
	}, (err, response, content) => {
		if (err) {
			console.error(err);
			return;
		}

		const contentType = response.headers['content-type'];

		if (/^text\//.test(contentType) || contentType === 'application/javascript') {
			content = content.toString().replace(/http:\/\//g, `${config.url}/http://`);
		}

		res.header('Content-Type', contentType);
		res.send(content);
	});
}
