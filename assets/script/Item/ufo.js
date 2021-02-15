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
        //获取屏幕分辨率
        var viewSize=cc.view.getDesignResolutionSize()
        this.createItem(cc.v2(-400,400))
    },

    start () {
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

    Move:function(dt,vx,vy){
        this.node.x += vx*dt
        this.node.y = (this.amplitude*Math.sin((this.speed+this.bias)*this.angularVelocity+this.phase)+this.startPos.y)
        this.bias+=this.speed
        
    },

    update (dt) {
       this.Move(dt,this.vx,this.vy)
    },

    checkDead: function(){
        return this.node.y <-1220
    },
});
