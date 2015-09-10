// appview
define([
	'backbone', 
	'../collections/todos', 
	'../views/todoview'
],
	function(Backbone, Todos, TodoView){
		App.Views.AppView = Backbone.View.extend({
			el: $('#todoapp'),
			statsTemplate: _.template($('#stats-template').html()),
			events: {
				"keypress #new-todo": "createOnEnter",
				"click #clear-completed": "clearCompleted",
				"click #toggle-all": "toggleAllComplete"
			},
			initialize: function() {
			  var todos = new Todos;
		      this.input = this.$("#new-todo");
		      this.allCheckbox = this.$("#toggle-all")[0];

		      this.listenTo(todos, 'add', this.addOne);
		      this.listenTo(todos, 'reset', this.addAll);
		      this.listenTo(todos, 'all', this.render);

		      this.footer = this.$('footer');
		      this.main = $('#main');

		      todos.fetch();

		      Backbone.View.prototype.initialize.apply(this, arguments);
		    },
			render: function(){
				var done = this.collection.done().length;
				var remaining = this.collection.remaining().length;
				if(this.collection.length){
					this.main.show();
					this.footer.show();
					this.footer.html(this.statsTemplate({done: done, remaining: remianing}));
				}
				else{
					this.main.hide();
					this.footer.hide();
				}
				this.allCheckbox.checked = !remaining;
			},
			addOne: function(todo){
				var view = new TodoView({model: todo});
				this.$("#todo-list").append(view.render().el);
			},
			addAll: function(){
				this.collection.each(this.addOne, this);
			},
			createOnEnter: function(e){
				if(e.keyCode != 13) return;
				if(!this.input.val()) return;
				this.collection.create({title: this.input.val()});
				this.input.val('');
			},
			clearCompleted: function(){
				_.invoke(this.collection.done(), 'destroy');
				return false;
			},
			toggleAllComplete: function(){
				var done = this.allCheckbox.checked;
				this.collection.each(function(todo){
					todo.save({'done': done});
				});
			}
		});
		return App.Views.AppView;
});