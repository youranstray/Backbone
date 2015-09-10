// Todo数据模型的集合
define(['backbone', '../models/todo'], function(Backbone, Todo){
	App.Collections.Todos = Backbone.Collection.extend({
		model: Todo,
		//localStorage: new LocalStorage("todos-backbone"),
		done: function(){
			alert("集合中done里面的this指： " + this);
			return this.where({done: true});
		},
		remianing: function(){
			return this.where({done: false});
		},
		nextOrder: function(){
			if(!this.length) return 1;
			return this.last().get('order') + 1;
		},
		comparator: 'order'
	});
	return App.Collections.Todos;	
});