// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Hinder = require("Hinder")

cc.Class({
    extends: Hinder,
    /**
     * bias:用于记录偏置量
     * amplitude:用于记录振幅
     * angularVelocity:用于记录角速度
     * phase:用于记录初相
     */
    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },


    createItem:function(xp,rocket,param){
        this._super(xp,rocket,param)
        //设置ufo移动模式
        this.setMoveLogic()
    },
    /**
     *@param speed [cc.Float]设置ufo移动速度
     */
    setMoveLogic(){
        //设置ufo速度
        this.vx=this.speed
    },

    Move:function(dt,vy,rocketNode){
        this.node.x += this.vx*dt
    },

});
