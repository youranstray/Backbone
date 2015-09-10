define(function(require, exports, module){
    var Backbone = require('backbone');
    var Book = Backbone.Model.extend({

        // Default attributes for the todo item.
        defaults: {
            title: null
        },

        // Ensure that each todo created has `title`.
        initialize: function() {
            if (!this.get("Id")) {
                this.set({"Id": this.defaults().Id});
            }

            if (!this.get("Created_at")) {
                this.set({"Created_at": this.defaults().Created_at});
            }

            if (!this.get("Retweeted_status")) {
                this.set({"Retweeted_status": this.defaults().Retweeted_status});
            }

            if (!this.get("Text")) {
                this.set({"Text": this.defaults().Text});
            }

            if (!this.get("Name")) {
                this.set({"Name": this.defaults().Name});
            }

            if (!this.get("UserId")) {
                this.set({"UserId": this.defaults().UserId});
            }

        }

    });

    module.exports = Book;
});
