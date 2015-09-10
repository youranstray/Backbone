// JavaScript Document
define(['backbone'], function(Backbone){
	App.Views.TodoView = Backbone.View.extend({
		tagName: "li",
		template: _.template($('#item-template').html()),
		events: {
			"click .toggle": "toggleDone",
			"dbclick .view": "edit",
			"click a.destroy": "clear",
			"keypress .edit": "close"
		},
		initialize: function(){
			alert("TodoView这里的this指： " + this);
			this.on('change', function(){
				alert("TodoView监听到页面发生了改变");
				console.log("TodoView监听到页面的change事件");
			});
			this.listenTo(this.model, 'change',this.render);
			this.on('destroy', function(){
				alert("TodoView监听到页面发生了改变");
				console.log("TodoView监听到页面destroy事件");
			});
			this.listenTo(this.model, 'destroy', this.remove);
			Backbone.View.prototype.initialize.apply(this, arguments);
		},
		render: function(){
			console.log("TodoView的render正在被调用");
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', thismodel.get('done'));
			this.input = this.$('.edit');
			alert("调用TodoView的render之后的this是：" + this);
			return this;
		},
		toggleDone: function(){
			this.model.toggle();
		},
		edit: function(){
			this.$el.addClass("editing");
			this.input.focus();
		},
		close: function(){
			var value = this.input.val();
			if(!value){
				this.clear();
			}
			else{
				this.model.save({titlt: value});
				this.$el.removeClass("editing");
			}
		},
		updateOnEnter: function(e){
			console.log("当TodoView中的updateOnEnter被调用时参数e是： " + e);
			if (e.keyCode == 13) this.close();
		},
		clear: function(){
			this.model.destroy();
		}
	});
	return App.Views.TodoView;
});