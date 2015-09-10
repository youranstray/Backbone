// Bookview
define(['jquery', 'backbone', 'collections/bookList'], function($, Backbone, BookList){
	App.Views.BookView = Backbone.View.extend({
		el: $("#bookapp"),
		events: {
			"keypress #book-author": "createOnEnter",
			"click #submit": "addOne"
		},
		initialize: function(){
			_.bindAll(this, 'render');
			this.inputTitle = this.$("#book-title");
			this.inputAuthor = this.$("#book-author");
			//this.main = this.$("#main");
			//this.listenTo(this.model, 'add', this.addOne);
			Backbone.View.prototype.initialize.apply(this, arguments); 
		},
		addOne: function(){
			alert("输入的书名： " + this.inputTitle.val());
			alert("输入的书名作者： " + this.inputAuthor.val());
			var bookList = new BookList;
			bookList.creat({title: this.inputTitle.val(), author: this.inputAuthor.val()});
			//model.save({title: this.inputTitle.val(), author: this.inputAuthor.val()});
			this.$("#book-list").append("<li>书名： " + this.inputTitle.val() + "<br>作者： " + this.inputAuthor.val() +"</li>");
		},
		createOnEnter: function(e){
			if(e.keyCode != 13) return;
			if(!this.inputTitle && !this.inputAuthor) return;
			//this.model({title: this.inputTitle.val(), author: this.inputAuthor.val()});
			this.addOne();
		},
		render: function(){
			
		}
	});
	return App.Views.BookView;
});