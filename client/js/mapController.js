/*global kampfer console*/
kampfer.require('Class');
//kampfer.require('dom');
//kampfer.require('style');
kampfer.require('event');
kampfer.require('mindMap.Map');
kampfer.require('mindMap.Node');

kampfer.provide('mindMap.MapController');

/*
 * map控制器类
 * 所有的浏览器事件都在这里被注册。view组件订阅mapController的自定义事件
 */
kampfer.mindMap.MapController = kampfer.Class.extend({
	
	init : function(currentMapManager) {
		
		this.currentMapManager = currentMapManager;
		
		//保存一个map视图的引用
		this.map = null;
		
		//保存所有node视图的引用
		this.nodes = [];
		
		this.currentNode = null;
		
		this.currentState = this.initialState;
		
	},
	
	render : function() {
		
		if(!this.map) {
			this.map = new kampfer.mindMap.Map(this, this.currentMapManager);
			this.map.render();
		}
		
		if(!this.nodes.length) {
			var nodes = this.currentMapManager.getAllNodes();
			kampfer.each(nodes, function(id, node) {
				this.nodes[id] = new kampfer.mindMap.Node(this, this.currentMapManager);
				this.nodes[id].render();
			});
		}
		
		this.monitorEvents();
		
	},

	monitorEvents : function() {
		
		var that = this;
		
		function handleEvent(event) {
			var controller = that;
			
			var func = controller.action2Function[controller.currentState][event.type];
			controller.currentState = func.call(controller, event);
		}
		
		kampfer.addEvent(this.map.element, '*', handleEvent);
		
	},
	
	action2Function : {
		
		//鼠标在map上
		mapActivated : {
			
			mouseout : function(event) {
				var relatedTarget = event.relatedTarget;
				if( this.isNodeElement(relatedTarget) ) {
					return 'nodeActivated';
				}
				return 'afk';
			},
			
			mousedown : function(event) {
				if(event.button === 1) {
					this.saveCursorPosition(event);
					return 'mapfocus';
				}
				return 'mapActivated';
			}

		},
		
		//在map上按住鼠标左键
		mapfocus : {
			
			mousemove : function(event) {
			
				var offsetX = event.pageX - this.lastCursorX,
					offsetY = event.pageY - this.lastCursorY;
				
				kampfer.event.trigger(this, 'moveMap', {
					offsetX: offsetX,
					offsetY : offsetY
				});
				
				return 'mapfocus';
				
			},
			
			mouseup : function(event) {
				return 'mapActivated';
			}
			
		},
		
		//鼠标在node上
		nodeActivated : {
			
			mouserout : function() {
				var relatedTarget = event.relatedTarget;
				if( this.isMapElement(relatedTarget) ) {
					return 'mapActivated';
				}
				return 'nodeActivated';
			},
			
			mousedown : function(event) {
				this.getCurrentNode(event);
				
				if(event.button === 3) {
					//显示编辑菜单
					kampfer.event.trigger(this, 'showMenu', {
						currentNode : this.currentNode
					});
					return 'nodeActivated';
				}
				
				if(event.button === 1) {
					this.saveCursorPosition(event);
					return 'nodefocus';
				}
			}
			
		},
		
		//在node上按住鼠标左键
		nodefocus : {
			
			mousemove : function() {
				var offsetX = event.pageX - this.lastCursorX,
					offsetY = event.pageY - this.lastCursorY;
						
				kampfer.event.trigger(this, 'moveNode', {
					offsetX : offsetX,
					offsetY : offsetY
				});
				
				return 'nodefocus';
			},
			
			mouseup : function() {
				return 'nodeActivated';
			}
			
		}
		
		//鼠标移出了map
		afk : {
			mouseover : function() {
				return 'mapActivated';
			}
		}

	},
	
	initialState : 'mapActivated',
	
	saveCursorPosition : function(event) {
		this.lastCursorX = event.pageX;
		this.lastCursorY = event.pageY;
	},
	
	getCurrentNode : function(event) {
		
		var nodeElement = this.getNodeElement(event.target),
			id = nodeElement.id;
		
		this.currentNode = this.nodes[id];
		
	},
	
	getNodeElement : function(element) {
	
		do {
			if( element.getAttribute('node-type') === 'node' ) {
				return element;
			}
			element = element.parentNode;
		}while(element);
		
		return null;
		
	},
	
	isNodeElement : function(element) {
		
		do {
			if( element.getAttribute('node-type') === 'node' ) {
				return true;
			}
			element = element.parentNode;
		}while(element);
		
		return false;
		
	},
	
	isMapElement : function(element) {
		if( element.getAttribute('node-type') === 'map' ) {
			return true;
		}
		return false;
	},
	
	getCommand : function(event) {
		var element = event.target,
			ret;
			
		while( element && !(ret = element.getAttribute('action')) ) {
			element = element.parentNode;
		}
		
		if(!ret) {
			throw 'err';
		}
		
		return ret;
	}
	
});