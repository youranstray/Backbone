// JavaScript Document
require.config({
	//baseUrl: '/Todos/js',
	paths: {
		jquery: '../libs/jquery-2.1.1',
		backbone: '../libs/backbone',
		underscore: '../libs/underscore',
		domReady: '../libs/domReady',
		//json2: 'libs/json2',
		//localStorage: 'libs/backbone.localStorage'
	},
	shim:{
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps:['underscore', 'jquery'],
			exports: 'Backbone'
		},
		/*'localStorage': {
			exports: 'LocalStorage'
		}*/
	}
});

App = {
	Models: {},
	Collections: {},
	Views: {}
};

require([
	'../libs/domReady',
	'jquery',
	'../views/appview',
	'../collections/todos'
	// '../models/todo.js'
], 
	function(domReady, $, AppView, Todos){
		domReady(function(){
			var array;
			var App = new AppView; 
		});
});