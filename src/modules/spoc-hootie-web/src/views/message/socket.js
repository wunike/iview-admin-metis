import Vue from 'vue';
import Sockette from 'sockette';
import { wssBaseUrl, wssBaseUrlDev } from '@public/libs/util';
let _i18n_vue = new Vue();
const $t = _i18n_vue.$t.bind(_i18n_vue);
export default function (url, opts) {

	let act = {
		send(data) {
			ws.json(data);
		},
		onmessage(e) {
			// console.log('Received:', e)
			try {
				opts.onmessage(JSON.parse(e.data));
			} catch (e) {
				console.warn(e);
			}
		},
		onopen(e) {
			// console.log('Connected!', e)
			opts.onopen(e);
		},
		close() {
			ws.close();
		},
		onclose(e) {
			opts.onclose(e);
		}
	};
	const ws = new Sockette(url, {
		timeout: 5e3,
		maxAttempts: 10,
		onopen: act.onopen,
		onmessage: act.onmessage,
		onreconnect: e => console.log('Reconnecting...', e),
		onmaximum: e => console.log('Stop Attempting!', e),
		onclose: act.onclose,
		onerror: act.onerror
	});
	return act;

}
//hootie.ivygate.cn/wss?
const r = wssBaseUrl;
const rDev = wssBaseUrlDev;
//const r = '192.168.11.9';
//let wsurl = 'ws://'+location.host.split(':')[0]+':2346';
let wsurl = 'wss://' + rDev + '/wss';
if (location.host == r) {
	wsurl = 'wss://' + r + '/wss';
}


export const config = {
	MSG_TYPE_TEXT: 1,
	MSG_TYPE_NOTICE: 2,
	MSG_TYPE_SHARE: 3,
	MSG_TYPE_IMG: 4,
	url: wsurl

};

export const util = {
	parse(str, username) {
		if (str.indexOf('@') >= 0) {
			const r = new RegExp(`@${username}`, 'g');
			return str.replace(r, function (m, i) {
				return `<i>${m}</i>`;
			});
		}
		const match = str.match(/<(icon-[\w\-]+)\/>/);
		if (match) {
			return `<svg class="icon"><use xlink:href="#${match[1]}" href="#${match[1]}"/></svg>`;
		}
		return str; // todo xss filter
	},
	byteFormat(size) {
		if (size) {
			var name = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			var pos = 0;
			while (size >= 1204) {
				size /= 1024;
				pos++;
			}
			if (size.toFixed) {
				return size.toFixed(2) + ' ' + name[pos];
			}
		}
	},
	getCursortPosition(textDom) {
		var cursorPos = 0;
		if (document.selection) {
			// IE Support
			textDom.focus();
			var selectRange = document.selection.createRange();
			selectRange.moveStart('character', -textDom.value.length);
			cursorPos = selectRange.text.length;
		} else if (textDom.selectionStart || textDom.selectionStart == '0') {
			// Firefox support
			cursorPos = textDom.selectionStart;
		}
		return cursorPos;
	},
	timeBefore(t) {
		var sec = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
		var ext = [$t('message_socket_301'), $t('message_socket_302'), $t('message_socket_303'), $t('message_socket_304'), $t('message_socket_305'), $t('message_socket_306'), $t('message_socket_307')];
		for (let i in sec) {
			const x = Math.floor(t / sec[i]);
			if (x != 0) {
				return $t('message_socket_308', [x, ext[i]]);
			}
		}
	}
};