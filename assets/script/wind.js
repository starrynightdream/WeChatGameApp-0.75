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
        windBackground:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.windEnter()
    },
    //风出现的建议动画
    windEnter(){
        this.windBackground.y=-500
        cc.tween(this.windBackground).to(1,{y:0}).start()
        this.windParticle.stopSystem()
        t=this.windParticle
        setTimeout("t.resetSystem()", 3000 )
    },
    //风消失的动画
    windLeave(){
        cc.tween(this.windBackground).to(1,{y:-500}).start()
        this.windParticle.stopSystem()
    }

    
    
    
    
    
    


    // update (dt) {},
});
