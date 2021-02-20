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
     * 重置背景至最初状态
     */
    reSetBackGround (){
        this.endAni();
    },

    /**
     * 使背景进入游戏状态
     */
    intoGame(){
        this.startAni();
    },

    /**
     * 播放开始的缓动动画
     * 将背景移动到游戏中的位置(屏幕外)。
     */
    startAni (){

        cc.tween(this.ground)
            .to(1, {y: -1700}, {easing: t=> t*t})
            .start();
    },

    /**
     * 播放结束的缓动动画
     * 将背景移动到开始位置。
     */
    endAni () {

        cc.tween(this.ground)
            .to(1, {y: -900}, {easing: t => Math.sqrt(t)})
            .start();
    },
});
