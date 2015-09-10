define(function(require, exports, module){
    var Backbone, Book;

    Backbone = require(['backbone']);
    require(['backbone.localStorage']);

    var $ = require('jquery-2.1.1');
    var _ = require(['underscore']);

    Book = require(['book']);


    var Books = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Book,

        // Save all of the todo items under the `"todos-backbone"` namespace.
        localStorage: new Backbone.LocalStorage("cfxixi-XiXiInfo-Img"),

        // Filter down the list of all todo items that are finished.
        done: function() {
            return this.filter(function(todo){ return todo.get('Id'); });
        },

        // Filter down the list to only todo items that are still not finished.
        remaining: function() {
            return this.without.apply(this, this.done());
        }

    });

    module.exports = new Books();
})

