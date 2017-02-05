'use strict';

const _ = require('lodash');
const uuid = require('uuid');
const {toMap} = require('./util.js');

class Node {
    constructor({id, data, children, parent} = {}) {
        this.parent = null;
        this.id = id || uuid();
        this.data = _.isPlainObject(data) ? toMap(data) : new Map();
        this.children = children || [];
        
        if (parent) {
            this.setParent(parent);
        }
    }
    
    children() {
        return this.children.slice();
    }
    
    append(node) {
        if (this.isParent(node)) {
            throw new Error('Parent node could not be appended');
        }
        
        if (! node.isRoot() && node.hasParent()) {
            node.parent.remove(node);
        }
        
        node.parent = this;
        this.children.push(node);
    }
    
    prepend(node) {
        if (this.isParent(node)) {
            throw new Error('Parent node could not be appended');
        }
        
        node.setParent(this);
        this.children.unshift(node);
    }
    
    insertByIndex(node, index) {
        if (node.isParent(this)) {
            throw new Error('Parent could not be inserted');
        }
        
        if (this.isParent(node)) {
            throw new Error('Already a child');
        }
        
        if (index >= this.children.length) {
            this.append(node);
            return;
        }
        else if (index < 0) {
            this.prepand(node);
            return;
        }
        
        this.children = [
            ...this.children.slice(0, index),
            node,
            ...this.children.slice(index)
        ];
        node.setParent(this);
    }
    
    getByIndex(index) {
        return this.children[index];
    }
    
    insertBefore(node, newNode) {
        if (! this.isChild(node)) {
            throw new Error('Argument #1 is not a child');
        }
        
        if (this.isChild(newNode)) {
            this.removeNode(node);
        }
        
        let i = this.getIndex(node);
        this.insertByIndex(newNode, i);
    }
    
    getIndex(node) {
        return this.children.indexOf(node);
    }
    
    removeNode(node) {
        let i = this.getIndex(node);
        
        if (i < 0) {
            return;
        }
        
        node.parent = null;
        this.children.splice(i, 1);
        
        node.parent = null;
    }
    
    setParent(node) {
        if (node.isParent(this)) {
            throw new Error('Child node could not be parent');
        }
        
        this.parent = node;
    }
    
    isRoot() {
        return ! this.parent;
    }
    
    parents() {
        let parents = [];
        let parent = this.parent;
        
        while(parent) {
            parents.push(parent);
            if (! parent.parent) {
                break;
            }
            
            parent = this.parent;
        }
        
        return parents;
    }
    
    isParent(node) {
        let parents = this.parents();
        
        return !! parents.find((parent) => parent.id === node.id);
    }
    
    hasParent() {
        return !! this.parent;
    }
    
    isChild(node) {
        return this.getIndex(node) > -1;
    }
    
    forEach(fn) {
        this.children.forEach(fn);
        
        return this;
    }
    
    map(fn) {
        return this.children.map(fn);
    }
    
    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }
    
    get length() {
        return this.children.length;
    }
    
    get firstChild() {
        return this.children.length
            ? this.children[0]
            : null;
    }
    
    get lastChild() {
        return this.children.length
            ? this.children[this.children.length - 1]
            : null;
    }
}

module.exports = Node;