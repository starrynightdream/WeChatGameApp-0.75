
cc.Class({
    extends: cc.Component,
    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start (){
        this.v = 800;
        this.node.y = Math.random() * 600 - 200;

        let face = Math.random() < 0.5 ? 1:-1;

        if (face === -1){
            this.node.scale = cc.v2(-1, 1);
        }
        this.node.x = -600 * face;
        cc.tween(this.node)
            .to(4, {x : 600 * face})
            .call(() =>{
                this.node.destroy();
            })
            .start();
    },

});
