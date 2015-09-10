// Book数据模型集合
define(['backbone', 'models/book'],function(Backbone, Book){
	//require(['libs/json2']);
	require(['libs/backbone.localStorage']);
	App.Collections.BookList = Backbone.Collection.extend({
		model: Book,
		localStorage: new Backbone.LocalStorage("books-backbone"),
		sync: function(method, model, options){
			return Backbone.sync(method, model, options);
		},
		parse: function(data, xhr){
			return data.data;
		},
	});
	return App.Collections.BookList;
});