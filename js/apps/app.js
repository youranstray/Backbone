// app.js
require.config({
	baseUrl:'/Demo/js',
	paths:{
		jquery: 'libs/jquery-2.1.1',
		backbone: 'libs/backbone',
		underscore: 'libs/underscore',
		domReady: 'libs/domReady'
	},
	shim:{
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

App = {
	Models: {},
	Collections: {},
	Views: {}
};

require([
	'libs/domReady', 
	'jquery',
	'views/bookview',
	'models/book'
],
	function(domReady, $, BookView, Book){
	domReady(function(){
		var book = new Book;
		var bookview = new BookView({model: book});
	});
});