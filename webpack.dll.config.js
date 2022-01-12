var path = require("path"),
	fs = require("fs"),
	webpack = require("webpack");

var vendors = {
	lib: [
		"clipboard",
		"codemirror",
		"countup",
		"cropperjs",
		"dayjs",
		"echarts",
		"html2canvas",
		"js-cookie",
		"jsbarcode",
		"pdfjs-dist",
		"quill",
		"quill-emoji",
		"simplemde",
		"sockette",
		"sortablejs",
		"wangeditor",
		"xlsx",
		"vue-carousel-3d",
		"vue-draggable-nested-tree",
		"vue-quill-editor",
		"vuedraggable",
	],
	ui: [
		"iview",
		"iview-area"
	],
	frame: [
		"vue",
		"vue-contextmenu",
		"vue-i18n",
		"vue-router",
		"vuex",
		"axios",
		"v-org-tree",
		"tree-table-vue",
	]
};

module.exports = {
	entry: {
		...vendors
	},
	output: {
		path: path.join(__dirname, "public/vendor"),
		filename: "[name].js",
		library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			context: __dirname,
			name: "[name]_[hash]",
			path: path.join(__dirname, "public/vendor", "[name].manifest.json")
		}),
	]
};