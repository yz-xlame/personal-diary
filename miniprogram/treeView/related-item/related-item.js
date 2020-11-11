Component({
    options: {
        styleIsolation: 'shared'
    },

    properties: {
        tree: {
            type: Object,
            value: null
        },
        depth: {
            type: Number,
            value: 0
        },
        isLast: {
            type: Boolean,
            value: false
        },
    },
})
