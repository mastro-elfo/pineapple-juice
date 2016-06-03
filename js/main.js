
(function(){
	"use strict"
	
	window.addEvent('domready', function(){
		// Create the collection obj
		var collection = new window.Collection();
		
		console && console.info && console.info('Send request to get ./conf/conf.json');
		// Contents are in conf object
		new Request.JSON({
			url: './conf/conf.json',
			method: 'GET',
			onSuccess: function(json){
				console && console.info && console.info('Request success: '+json.length+' item[s] found');
				json.each(function(item){
					console && console.info && console.info('Add item: '+item.name);
					// Populate collection
					collection.addModel(item);
				});
				
				// Uncover page items
				console && console.info && console.info('Uncover page items');
				$$('.hidden').each(function(item){
					item.removeClass('hidden');
				});
				$('waiter').addClass('hidden');
			},
			onError: function(text, error) {
				console && console.error && console.error('Error: '+text+' '+error);
			},
			onFailure: function(xhr){
				console && console.error && console.error('Request failed!');
			},
			onException: function(headerName, value){
				console && console.error && console.error('Exception: '+headerName+' = '+value);
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