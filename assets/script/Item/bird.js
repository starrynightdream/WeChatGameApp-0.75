
cc.Class({
    extends: cc.Component,
    properties: {
        t: {
            default: 4,
            type: cc.Integer,
        } 
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
            .to(this.t, {x : 600 * face})
            .call(() =>{
                this.node.destroy();
            })
            .start();
    },

});
