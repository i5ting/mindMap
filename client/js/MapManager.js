/*global kampfer*/
kampfer.require('Class');

kampfer.provide('mindMap.MapManager');

kampfer.mindMap.MapManager = kampfer.Class.extend({
	
	init : function(data) {
		this.data = data;
	},
	
	getData : function() {
		return this.data;
	},
	
	getNode : function(id) {
		var node = this.data.nodes[id];
		if(node) {
			return node;
		}
	},
	
	getRootNode : function() {
		return this.getNode('root');
	},
	
	getChildren : function(id) {
		var node = this.data.nodes[id], 
			nodes = [];
		if(node && node.children.length > 0) {
			for(var i = 0, l = node.children.length; i < l; i++) {
				nodes.push( this.getNode(node.children[i]) );
			}
		}
		return nodes;
	},
	
	createNode : function(parent) {
		var type = kampfer.type(parent), node;
		if(type === 'string') {
			var id = this.generateUniqueId();
			node = this.data.nodes[id] = {
				id : id,
				parent : parent,
				children : [],
				content : 'new node',
				offset : {
					x : 0,
					y : 100
				}
			};
			this.data.nodes[parent].children.push(id);
		} else if(type === 'object') {
			node = parent;
			if(!this.data.nodes[node.id]) {
				this.data.nodes[node.id] = node;
				this.data.nodes[node.parent].children.push(node.id);
			}
		}
		return node;
	},
	
	deleteNode : function(id) {
		var node = this.data.nodes[id],
			parent = this.data.nodes[node.parent],
			i, l;
		for(i = 0, l = node.children.length; i < l; i++) {
			this.deleteNode(node.children[i]);
		}
		delete this.data.nodes[id];
		for(i = 0, l = parent.children.length; i < l; i++) {
			if(parent.children[i] === id) {
				parent.children.splice(i, 1);
			}
		}
	},
	
	setNodeContent : function(id, text) {
		this.data.nodes[id].content = text;
	},
	
	setNodePosition : function(id, x, y) {
		this.data.nodes[id].offset.x = x;
		this.data.nodes[id].offset.y = y;
	},
	
	/*
	 * 生成唯一id
	 * 直接使用时间戳不可行
	 * 以下方法摘自http://www.cnblogs.com/NoRoad/archive/2010/03/12/1684759.html
	 */
	generateUniqueId : function() {
		var guid = "";
		for(var i = 1; i <= 32; i++) {
			var n = Math.floor(Math.random() * 16.0).toString(16);
			guid += n;
			if((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
				guid += "-";
			}
		}
		return guid;
	},
	
	getOptions : function() {}
	
});
