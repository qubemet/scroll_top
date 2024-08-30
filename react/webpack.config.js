const path = require( 'path' );

var config = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: { loader: 'babel-loader' }
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ['style-loader','css-loader', 'sass-loader']
			}
		],
	},
	plugins: [],
};


var mainExport = Object.assign({}, config, {
	entry: {
		'./assets/js/dashboard' : './src/index.js',
	},
	output: {
		path: path.join(__dirname, '../'),
		filename: '[name].js',
	},
});

// Return Array of Configurations
module.exports = [
    mainExport
];