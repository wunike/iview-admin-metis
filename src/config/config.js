let config = {
	compress: true,
	port: 8080,
	proxyTable: {
		"/api": {
			// target: 'http://39.97.165.72:10000',
			// target: 'http://39.107.224.42:10000',
			// target: 'http://192.168.3.199:8760',
			target: 'https://metis.newaigo.com/',
			pathRewrite: {
				"^/api": "/api",
			}
		},
		"/spoc-caiwu": {
			target: 'https://metis.newaigo.com/',
            // target: 'http://192.168.3.199:8760',
			pathRewrite: {
				"^/spoc-caiwu": "/spoc-caiwu",
			}
		},
		"/spoc-jw": {
			target: 'https://metis.newaigo.com/',
			pathRewrite: {
				"^/spoc-jw": "/spoc-jw",
			}
		},
        "/spoc-hootie": {
            target: 'https://metis.newaigo.com/',
            pathRewrite: {
                "^/spoc-hootie": "/spoc-hootie",
            }
        },
		"/spoc-contract": {
			target: 'https://metis.newaigo.com/',
			//			target: 'http://192.168.13.5:8005',
			pathRewrite: {
				"^/spoc-contract": "/spoc-contract",
			}
		},
		"/spoc-common": {
			target: 'https://metis.newaigo.com/',
			pathRewrite: {
				"^/spoc-common": "/spoc-common",
			}
		},
		/* "/spoc-crm": {
			target: 'http://47.93.31.175:8189',
			pathRewrite: {
				"^/spoc-crm": "/spoc-crm",
			}
		}, */
		"/spoc-crm": {
			target: 'https://metis.newaigo.com/',
			pathRewrite: {
				"^/spoc-crm": "/spoc-crm",
			}
		},
        "/spoc-report": {
            target: 'https://metis.newaigo.com/',
            pathRewrite: {
                "^/spoc-report": "/spoc-report",
            }
        },
		"/chat/": {
			// target:'http://127.0.0.1:2345',
			target: 'https://metis.newaigo.com/',
			pathRewrite: {
				"^/chat/": "/",
			}
		}
	}
};
module.exports = config;
