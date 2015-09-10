// Todo数据模型
define(['backbone'], function(Backbone){
	App.Models.Todo = Backbone.Model.extend({
		defaults: function(){
			return {
				title: "empty todo...",
				order: Todos.nextOrder(),//this.collection.nextOrder()
				done: false
			};
		},
		initialize: function(){
			this.on('invalid', function(model, error){
				alert(error);
			});
		},
		toggle: function(){
			this.save({done: !this.get("done")});
		},
		urlRoot: '',
		parse: function(data, options){
			var record;
			if(data.hasOwnProperty('success') && data.hasOwnProperty('msg')){
				if(data.success == false && !data.data){
					record = this.attributes;
				}
				else{
					record = data;
				}
			}
			else{
				record = data;
			}
			if(record){
			}
			return record;
		},
		validate: function(attrs, options){
			var title = attrs.title;
			if(title.length > 20){
				return '输入字符串的最大长度为20个字';
			}
		}
	});
	return App.Models.Todo;
});