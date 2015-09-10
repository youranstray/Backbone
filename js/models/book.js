// Book数据模型
define(['backbone'],function(Backbone){
	App.Models.Book = Backbone.Model.extend({
		default: {
			title: null,
			author: null
		},
		initialize: function(){
			this.on("invalid", function(model, error){
				alert(error);
			});
		},
		//urlRoot: '',
		parse: function(data, options){
			var record;
			if(data.hasOwnProperty('success') && data.hasOwnProperty('msg')){
				if(data.success == false && !data.data){
					record = this.attributes;
				}
				else{
					record = data.data;
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
			if(title.length > 20)
			{
				return '书名最大长度为20个字';
			}
			return;
		}
	});
	return App.Models.Book;
});