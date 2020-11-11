Page({
    data: {
        tree: null
    },

    onReady() {
        this.setVirtualData();
    },

    setVirtualData() {
        let count = 1;
        const meta = (() => ({
            id: count,
            name: '吴一帆',
            position: '股东',
            avatar: '',
            employee: [],
        }));
        const fill = function(tree, depth=0) {
            let count = 0;
            while (count < Math.pow(2, depth)) {
                count++;
                tree.employee.push(meta());
            }
        }
        const deep = function(tree, depth=0) {
            if (tree.employee.length == 0) {
                fill(tree, depth);
            } else {
                tree.employee.forEach(item => {
                    deep(item, depth);
                })
            }
        }
        const createTree = function(depth = 0) {
            let tree = null;
            for (let layer = 0; layer < depth; layer++) {
                if (layer == 0) {
                    tree = meta();
                } else {
                    deep(tree, layer)
                }
            }
            return tree;
        }
        const tree = createTree(3);
        this.setData({
            tree
        })
        console.log('tree: ', tree);
    },
})
