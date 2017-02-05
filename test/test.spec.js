'use strict';

const Node = require('..');
const should = require('should');

describe('Node.', () => {
    describe('append()', () => {
        it('should append node into end of child list', () => {
            let root = new Node();
            
            let a = new Node({data: {name: 'a'}});
            let b = new Node({data: {name: 'b'}});
            
            root.append(a);
            root.append(b);
            
            should(root.lastChild).be.equal(b);
        });
    });
    
    describe('prepend()', () => {
        it('should prepend node into beginning of child list', () => {
            let root = new Node();
            
            let a = new Node({data: {name: 'a'}});
            let b = new Node({data: {name: 'b'}});
            
            root.prepend(a);
            root.prepend(b);
            
            should(root.firstChild).be.equal(b);
        });
    });
    
    describe('insertByIndex()', () => {
        it('should return proper nodes', () => {
            let root = new Node();
            
            let a = new Node({data: {name: 'a'}});
            let b = new Node({data: {name: 'b'}});
            let c = new Node({data: {name: 'c'}});
            
            root.append(a);
            root.append(b);
            root.insertByIndex(c, 1);
            
            should(root.getByIndex(0)).be.equal(a);
            should(root.getByIndex(1)).be.equal(c);
            should(root.getByIndex(2)).be.equal(b);
        });
    });
    
    describe('getByIndex()', () => {
        it('should return proper nodes', () => {
            let root = new Node();
            
            let a = new Node({data: {name: 'a'}});
            let b = new Node({data: {name: 'b'}});
            
            root.append(a);
            root.append(b);
            
            should(root.getByIndex(0)).be.equal(a);
            should(root.getByIndex(1)).be.equal(b);
        });
    });
    
    describe('remove()', () => {
        it('should remove node from children', () => {
            let root = new Node();
            
            let a = new Node({data: {name: 'a'}});
            let b = new Node({data: {name: 'b'}});
            
            root.append(a);
            root.append(b);
            root.removeNode(a);
            
            should(root.getByIndex(0)).be.equal(b);
            should(a).has.ownProperty('parent', null);
        });
    });
    
    describe('isRoot()', () => {
        it('should determine node as root', () => {
            let root = new Node();
            
            let a = new Node({data: {name: 'a'}});
            let b = new Node({data: {name: 'b'}});
            
            root.append(a);
            root.append(b);
            
            should(root.isRoot()).be.equal(true);
            should(a.isRoot()).be.equal(false);
            should(b.isRoot()).be.equal(false);
        });
    });
    
    describe('Iterator', () => {
        it('Should be iteratable', () => {
            let root = new Node();
            
            root.append(new Node({data: {name: 'b'}}));
            root.prepend(new Node({data: {name: 'a'}}));
            
            let nodes = [];
            
            for (let node of root) {
                nodes.push(node.data.get('name'));
            }
            
            should(nodes).has.length(2);
            should(nodes).be.deepEqual(['a', 'b']);
        });
    });
    
    describe('forEach()', () => {
        it('Should iterate over children', () => {
            let root = new Node();
            
            root.append(new Node({data: {name: 'b'}}));
            root.prepend(new Node({data: {name: 'a'}}));
            
            let nodes = [];
            
            root.forEach((node) => {
                nodes.push(node.data.get('name'));
            });
            
            should(nodes).has.length(2);
            should(nodes).be.deepEqual(['a', 'b']);
        });
    });
    
    describe('map()', () => {
        it('Should iterate over children', () => {
            let root = new Node();
            
            root.append(new Node({data: {name: 'b'}}));
            root.prepend(new Node({data: {name: 'a'}}));
            
            let nodes = root.map((node) => {
                return node.data.get('name');
            });
            
            should(nodes).has.length(2);
            should(nodes).be.deepEqual(['a', 'b']);
        });
    });
});
