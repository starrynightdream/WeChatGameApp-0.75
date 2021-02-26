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
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.reSetEve();
    },

    /**
     * 太阳警告
     * @param {Number} xpos 出现的x位置
     */
    warn(xpos = 0){
        this.node.x = xpos;
        // 是否已经结束
        this.end = false;
        // 是否正在工作
        this.inWork = false;
        // 是否处于警告
        this.inWarn = true;

        this.inWork = true;
        this.toWorkFlag = true;
    },

    /**
     * 风进入
     */
    enter(){
        this.toWorkFlag = false;

        cc.tween(this.node)
            .to(3, {y : -1200})
            .call(()=>{
                this.inWork = false;
                this.toLeaveFlag = true;
            })
            .start();
    },
    
    /**
     * 风消失
     */
    leave(){
        this.toLeaveFlag = false;
        this.end = true;
    },

    inRange (rocketPos){
        const y = Math.abs(rocketPos.y + 687.835 - this.y) < 150;
        const x = Math.abs(rocketPos.x - this.x) < 150; 
        return  x && y;
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
        cc.tween(this.node)
            .stop();

        this.node.opacity = 100;
        this.node.y = 1200;
        this.end = true;
        this.inWork = false;
        this.toWorkFlag = false;
        this.toLeaveFlag = false;
    },
    
    makeEff (rocket) {
        if (rocket.engine.type === 2){

            rocket.engine.addE(10);
        }else if (this.opacity === 100){
            this.opacity = 225;
        }
    },

    // update (dt) {},
});
