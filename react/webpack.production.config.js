'use strict';

var path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

var config = {
	mode: 'production',
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
        ]
    },
	optimization: {
		minimize: true,
        concatenateModules:false,
		minimizer: [new TerserPlugin({
            parallel: true,
				terserOptions: {
					output: {
						comments: /translators:/i,
					},
					compress: {
						passes: 2,
					},
					mangle: {
						reserved: [ '__', '_n', '_nx', '_x' ],
					},
				},
				extractComments: true,
        })]
	}
};

var mainExport = Object.assign({}, config, {
	entry: {
		'./assets/js/dashboard' : './src/index.js'
	},
	output: {
		path: path.join(__dirname, '../'),
		filename: '[name].js',
	},
});

module.exports = [
    mainExport
];