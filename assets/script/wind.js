// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        windParticle:cc.ParticleSystem,
        background:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.background.node.opacity = 0;
        this.node.y = 0;
    },

    /**
     * 风警告
     * @param {Number} xpos 出现的x位置
     */
    windWarn(xpos = 0){

        cc.tween(this.background)
            .to(0.6, {opacity : 60})
            .start();

        this.windParticle.stopSystem();
    },

    /**
     * 风进入
     */
    windnter (){
        this.windParticle.resetSystem();
        cc.tween(this.background)
            .to(0.6, {opacity: 127})
            .start();
    },
    
    /**
     * 风消失
     */
    windLeave(){
        cc.tween(this.background)
            .to(0.6,{opacity : 0})
            .start();
        this.windParticle.stopSystem();
    }

    // update (dt) {},
});
