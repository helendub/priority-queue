const Node = require('./node');

class MaxHeap {
	constructor() {
	this.root = null;
	this.count=0;
	this.parentNodes = [];	
	}


	push(data, priority) {
		let	node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.count++;
	}

	pop() {
		if (this.parentNodes.length > 0) {
	
			let detachRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachRoot);
			
			this.shiftNodeDown(this.root);
			this.count--;
			return detachRoot.data;
		}	

	}

	detachRoot() {
		let DetachedRoot = this.root;
		this.root = null;
		if(this.parentNodes[0]==DetachedRoot){
			this.parentNodes.shift();
		}
		return DetachedRoot;	
	}

	restoreRootFromLastInsertedNode(detached) {
	
		let root = detached;	
		let last = this.parentNodes.pop();
		if(last){
			last.remove();
			this.root = last;
			if (root.left !=null&&root.left != last) {
				last.appendChild(root.left);
			}
			if (root.right !=null&&root.right != last) {
				last.appendChild(root.right);
			}
			let lastElemIndex =this.parentNodes.length-1;
			if(lastElemIndex>-1){
				let lastElem = this.parentNodes[lastElemIndex];
				if(lastElem.parent&& !lastElem.parent.right){
					this.parentNodes.unshift(lastElem.parent);
				}
			}
			if(this.parentNodes.length==0){
				this.parentNodes.push(this.root);
			}
		}
	}



	size() {
		return this.count;	
	}

	isEmpty() {
		if (this.parentNodes.length==0)
		return true;
		else return false;
	}

	clear() {
		this.root = null;
		this.count=0;
		this.parentNodes = [];	
	}

	insertNode(node) {
		
		if (this.parentNodes.length == 0) {
			this.root=node;
			this.parentNodes.push(node);
			return;
		}
		this.parentNodes[0].appendChild(node);
		this.parentNodes.push(node);
		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}	
	}



	shiftNodeUp(node) {

		let parent=node.parent;
		if (parent!= null && node.priority > parent.priority) {			
			let indexOfCurrent=	this.parentNodes.indexOf(node);
			let indexOfParent= this.parentNodes.indexOf(parent);
			node.swapWithParent();
			if(this.root==parent){
				this.root=node;
			}
			if(indexOfParent>-1){
				this.parentNodes[indexOfParent]=node;
			}
			if(indexOfCurrent>-1){
			 	this.parentNodes[indexOfCurrent]=parent;
			}
		this.shiftNodeUp(node);
		}
	}


	shiftNodeDown(node) {

		if(!node){
			return;
		}

		let left=node.left;
		let right=node.right;
		if(left===null){
			return;
		}
		if(right===null||left.priority>=right.priority){
			if(left.priority>node.priority){
				left.swapWithParent();
				if(this.root===node){
					this.root=left;
				}
				let childIndex=this.parentNodes.indexOf(left);
				let nodeIndex=this.parentNodes.indexOf(node);
				if(childIndex>-1){
					this.parentNodes[childIndex]=node;
				}
				if(nodeIndex>-1){
					this.parentNodes[nodeIndex]=left;
				}
				this.shiftNodeDown(node);
			}
		}else 
		{
			if(right.priority>node.priority){
				right.swapWithParent();
				if(this.root===node){
					this.root=right;
				}
				let childIndex=this.parentNodes.indexOf(right);
				let nodeIndex=this.parentNodes.indexOf(node);
				if(childIndex>-1){
					this.parentNodes[childIndex]=node;
				}
				
				if(nodeIndex>-1){
					this.parentNodes[nodeIndex]=right;
				}
				this.shiftNodeDown(node);
			}
		}

	}
}

module.exports = MaxHeap;
