$(document).ready(function() {
	/*数据模型*/
	var User = Backbone.Model.extend({
		defaults: {
			username: '默认用户名'
		},
		initialize: function(){
			if(!this.get(username)){
				this.set({"username": this.defaults.username});
			}
			if (!this.get("userid")) {
				this.set({"userid": ++userid});
			}
		}
	});

	/*数据模型集合*/
	var UserCollection = Backbone.Collection.extend({
		model: User,
		localStorage: new Backbone.LocalStorage("users")
	});

	/*基础视图*/
	var View = Backbone.View.extend({
		register: function(state){
			this.state = state;
			return this;
		}
	});

	/*列表项视图*/
	var UserItemView = View.extend({
		events: {
			'click .removeUser': 'deleteUser',
			'click .viewUser': 'viewUser'
		},
		tagName: 'li',
		template: _.template($('#user-item-template').html()),
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		deleteUser: function(){
			this.state.trigger('removeUser', this.model);
		},
		viewUser: function(){
			this.state/trigger('viewUser', this.model);
		}
	});

	/*列表视图*/
	var UserListView = View.extend({
		template: _.template($('#list-template').html()),
		initialize: function(){
			var view = this;
			this.state = new Backbone.Model();
			this.router = this.options.router;
			this.collection.unbind('reset', this.addAll, this);
			setTimeout(function(){
				view.collection.fetch();
			}, 0);
		},
		render: function(){
			var view = this;
			this.$el.html(this.template(this.state.toJSON()));
			this.state.on('removeUser', function(user){
				user.router.navigate('user/' + user.cid, {trigger: true});
			});
			return this;
		},
		createUserItemView: function(user){
			var userItemView = new UserItemView({
				model: user
			});
			userid = Math.max.call(null, user.get('userid'), userid);
			userItemView.register(this.state).render().$el.appendTo($('#list'));
		},
		addAll: function(){
			this.collection.each(this.createUserItemView.bind(this));
		}
	});

	/*添加修改视图*/
	var UserModifyView = View.extend({
		events:{
			'click a.add': 'modify'
		},
		template: _.template($('#modify-template').html()),
		initialize: function(){
			this.router = this.options.router;
		},
		render: function(){
			var view = this;
			if(this.model) {
				this.$el.html(this.template(this.model.toJSON()));
			}else{
				this.$el.html(this.template({username: ''}));
			}
			setTimeout(function(){
				view.$el.find('input').focus(
					).select();
			}, 0);
			return this;
		},
		modify: function(){
			var view = this;
			if (this.model){
				this.model.save({'username': this.$el.find('input').val()});
			}else{
				this.router.userCollection.create(new User({
					username: view.$el.find('input').val(),
					userid: ++userid
				}));
			}
			this.router.navigate('list', {trigger: true});
		}
	});

	/*入口视图*/
	var UserView = View.extend({
		template: _.template($('#user-template').html()),
		initialize: function(){
			this.router = this.options.router;
		},
		render: function(){
			var view = this;
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		events: {
			'click .editUser': 'editUser'
		},
		editUser: function(){
			this.router.navigate('edit/' + this.model.cid, {trigger: true});
			this.remove();
		}
	});

	/*配置router*/
	var App = Backbone.Router.extend({
		initialize: function(el){
			this.el = el;
			this.userCollection = new UserCollection;
		},
		routes: {
			'': 'list',
			'list': 'list',
			'add': 'edit',
			'edit/:cid': 'edit',
			'user': 'user',
			'user/:cid': 'user'
		},
		list: function(){
			var router = this;
			this.clean();
			this.currentView = new UserListView({
				collection: router.userCollection,
				router:router
			}).render().$el.appendTo($(this.el));
		},
		edit: function(cid){
			var router = this,
				user = null;
			this.clean();
			if(cid){
				user = router.userCollection.getByCid(cid);
			}
			this.currentView = new UserModifyView({
				model: user,
				router: router
			}).render().$el.appendTo($(this.el));
		},
		user: function(cid){
			var router = this, user = null;
			this.clean();

			if (cid) {
				user = router.userCollection.getByCid(cid);
			}
			this.currentView = new UserView({
				model: user,
				router: router
			}).rend().$el.appendTo($(this.el));
		},
		clean: function(){
			if(this.currentView){
				this.currentView.remove();
				this.currentView = null;
			}
		}
	});
	
	new App('body');
	Backbone.history.start();
});