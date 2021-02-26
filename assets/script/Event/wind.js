// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const Event = require('EventBase');

cc.Class({
    extends: Event,

    properties: {
        windParticle : cc.ParticleSystem,
        background : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.reSetEve();
    },

    /**
     * 风警告
     * @param {Number} xpos 出现的x位置
     */
    warn(xpos = 0){
        // 是否已经结束
        this.end = false;
        // 是否正在工作
        this.inWork = false;
        // 是否处于警告
        this.inWarn = true;
        cc.tween(this.background)
            .to(1.5 , {opacity : 60})
            .start()
            .call(()=>{
                this.inWork = true;
                this.toWorkFlag = true;
            });

        this.windParticle.stopSystem();
    },

    /**
     * 风进入
     */
    enter(){
        this.toWorkFlag = false;
        this.windParticle.resetSystem();
        cc.tween(this.background)
            .to(0.6, {opacity: 127})
            .start()
            .call(()=>{
                this.inWork = false;
                this.toLeaveFlag = true;
            });
    },
    
    /**
     * 风消失
     */
    leave(){
        this.toLeaveFlag = false;
        cc.tween(this.background)
            .to(0.6,{opacity : 0})
            .start()
            .call(()=>{
                this.end = true;
            });
        this.windParticle.stopSystem();
    },

    inRange (rocketPos){
        return Math.abs(rocketPos.x - this.x) < this.node.size.w /2;
    },

    eventEnd(){
        return this.end;
    },
    eventWork(){
        return this.inWork;
    },
    toWork (){
        return this.toWorkFlag;
    },
    toLeave(){
        return this.toLeaveFlag;
    },

    reSetEve (){
        this.background.opacity = 0;
        this.node.y = -900;
        this.end = true;
        this.inWork = false;
        this.toWorkFlag = false;
        this.toLeaveFlag = false;
    },
    makeEff (rocket) {
        rocket.engine
        this.inWork = false;
        this.toLeaveFlag = true;
    },

    // update (dt) {},
});
