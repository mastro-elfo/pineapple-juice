
(function(){
	"use strict";
	
	window.Model = new Class({
		Extends: Epitome.Model,
		options: {
			defaults: {
				'name': 'Home M-E',
				'description': 'Una home page qualsiasi',
				'icon': '',
				'title': 'Home page di mastro-elfo',
				'src': 'http://mastro-elfo.github.io',
				'language': 'it-IT',
				
				'selected': false,
				'last-selection': 0
			},
			
			'onChange:selected': function(value){
				if(value){
					this.collections.each(function(cll){
						cll.filter(function(item){
							return (item.cid != this.cid) && item.get('selected');
						}, this).each(function(item){
							item.set('selected', false);
						})
					}, this);
				}
			}
		}
	});
	
	window.Collection = new Class({
		Extends: Epitome.Collection,
		model: window.Model,
		options: {
			onAdd: function(model){
				new window.MenuEntryView({
					model: model,
					element: new Element('div').inject($('menu'))
				});
				new window.TitleView({
					model: model,
					element: $('maincontainer').getElement('header')
				});
				new window.PageView({
					model: model,
					element: new Element('iframe', {
						'src': ''
					}).inject('maincontainer')
				});
				
			}
		}
	});
	
	window.MenuEntryView = new Class({
		Extends: Epitome.View,
		options: {
			template: '<div class="container" title="<%=title%>"><img src="<%=icon%>" alt="<%=icon-alt%>"/><div class="name"><%=name%></div><div class="description"><%=description%></div></div>',
			events: {
				'click': 'select'
			},
			onSelect: function(event){
				event && event.stop && event.stop();
				this.model.set({
					'selected': true,
					'last-selection': +new Date()
				});
			},
			onReady: function(){
				this.render();
			},
			'onChange:model': function(){
				this.render();
			},
			'onDestroy:model': function(){
				this.destroy();
			}
		},
		render: function(){
			this.empty();
			this.element.set('html', this.template(this.model.toJSON()));
			this.parent();
			return this;
		}
	});
	
	window.TitleView = new Class({
		Extends: Epitome.View,
		options: {
			onReady: function(){
				this.render();
			},
			'onChange:model': function(){
				this.render();
			}
		},
		render: function(){
			if(this.model.get('selected')) {
				this.element.setStyles({
					'color': this.model.get('header-color'),
					'background-color': this.model.get('header-background')
				});
				this.element.getElement('#page-title').set('html', this.model.get('name'));
			}
		}
	});
	
	window.PageView = new Class({
		Extends: Epitome.View,
		options: {
			onReady: function(){
				this.render();
			},
			'onChange:model': function(){
				this.render();
			}
		},
		render: function(){
			if(this.model.get('selected')) {
				console && console.info && console.info('Display '+this.model.get('name'));
				this.element.addClass('selected');
				if(this.element.get('src') != this.model.get('src')){
					console && console.info && console.info('Load '+this.model.get('src'));
					this.element.set('src', this.model.get('src'));
				}
			}
			else {
				this.element.removeClass('selected');
			}
		}
	});
})();
