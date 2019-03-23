class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
	
		if (this.left != null) {
			if (this.right == null) {
				this.right = node;
				node.parent = this;
			} 
		}
			 else {
					this.left = node;
					node.parent = this;
		}

	}

	removeChild(node) {

		if (node == this.left) this.left = null;
		else if (node == this.right) this.right = null;
		else throw new SyntaxError("Error");
		node.parent = null;

	}

	remove() {
		if (this.parent != null)
		this.parent.removeChild(this);

	}

	swapWithParent() {

		let parent = this.parent;
		if (parent != null) {
			let grandparent = parent.parent;			
			let parentleft = parent.left;
			let parentright = parent.right;
			if (parentleft === this) {
				
				parent.left = this.left;
				parent.right = this.right;
				if(parent.left!=null){
					parent.left.parent = this.parent;
				}
				if(parent.right!=null){				
					parent.right.parent = this.parent;
				}
				this.left = parent;
				this.right = parentright;

				if(this.right!=null){
					this.right.parent = this;}	
			}
			else if (parentright === this) {
				parent.left = this.left;
				parent.right = this.right;
				if(parent.left!=null){
					parent.left.parent = this.parent;
				}
				if(parent.right!=null){
					parent.right.parent = this.parent;
				}
				this.right = parent;
				this.left = parentleft;
				if(this.left!=null){
					this.left.parent = this;}
				if(grandparent!=null){
					grandparent.right=this;
				}
			}
			parent.parent = this;
			this.parent=grandparent;
			if(grandparent!=null){
				if(grandparent.left===parent){
					grandparent.left=this;
				}else if(grandparent.right===parent){
					grandparent.right=this;
				}
			}
		}

	}
}

module.exports = Node;
