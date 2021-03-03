
cc.Class({
    extends: cc.Component,
    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start (){
        this.v = 800;
        this.node.x = -600;
        this.node.y = Math.random() * 150 + 250;

        cc.tween(this.node)
            .to(4, {x : 600})
            .call(() =>{
                this.node.destroy();
            })
            .start();
    },

});
