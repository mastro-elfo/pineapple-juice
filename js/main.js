
(function(){
	"use strict"
	
	window.addEvent('domready', function(){
		// Create the collection obj
		var collection = new window.Collection();
		
		// Contents are in conf object
		new Request.JSON({
			url: 'conf/conf.json',
			method: 'GET',
			onSuccess: function(json){
				json.each(function(item){
					// Populate collection
					collection.addModel(item);
				});
				
				// Display items
				$$('.hidden').each(function(item){
					item.removeClass('hidden');
				})
				$('waiter').addClass('hidden');
			},
			onError: function(text, error) {
				console.log(text+' '+error);
			},
			onFailure: function(xhr){
				console.log('Request failed!');
			},
			onException: function(headerName, value){
				console.log('Exception: '+headerName+' = '+value);
			}
		}).send();
		
		// Toggle button
		new Epitome.View({
			collection: collection,
			element: 'maincontainer',
			events: {
				'click:relay(#toggle-menu)': 'toggle'
			},
			onToggle: function(event){
				event && event.stop && event.stop();
				if(this.element.hasClass('open')) {
					this.element.removeClass('open');
				}
				else {
					this.element.addClass('open');
				}
			},
			'onChange:collection': function(){
				this.element.removeClass('open');
			}
		});
	});
})();