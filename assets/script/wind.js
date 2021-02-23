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
        this.windEnter()
    },
    //风出现的建议动画
    windEnter(){
        this.background.opacity=0
        cc.tween(this.background).to(0.6,{opacity:255}).start()
        this.windParticle.stopSystem()
        t=this.windParticle
        tb=this.background
        setTimeout(function(){
            t.resetSystem()
            cc.tween(tb).to(0.6,{opacity:150}).start()
        }, 3000)
    },
    //风消失的动画
    windLeave(){
        cc.tween(this.background).to(0.6,{opacity:0}).start()
        this.windParticle.stopSystem()
    }

    
    
    
    
    
    


    // update (dt) {},
});
