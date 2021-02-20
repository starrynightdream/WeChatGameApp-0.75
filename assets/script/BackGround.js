// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.ground = this.node.childrenCount >0 ? this.node.children[0] : null;
        this.reSetBackGround();
    },

    // update (dt) {},
    /**
     * 重置背景
     */
    reSetBackGround (){
        this.endAni();
    },

    startAni (){
        cc.tween(this.ground)
            .to(1, {y: -1700}, {easing: t=> t*t})
            .start();
    },

    endAni () {
        cc.tween(this.ground)
            .to(1, {y: -900}, {easing: t => Math.sqrt(t)})
            .start();
    },
});
