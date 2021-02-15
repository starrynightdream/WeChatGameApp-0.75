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
        console.log(viewSize)
        this.createItem(cc.v2(-100,600))
    },

    start () {
    },

    createItem:function(xp){
        //设置ufo初始位置,获取火箭当前位置
        this.setPos(xp,this.rocket.position)
        //设置ufo移动模式
        this.setMoveLogic(100)
    },
    /**
     *@param speed [cc.Float]设置ufo移动速度
     */
    setMoveLogic(speed){
              
        //设置ufo速度
        this.speed=speed
        this.vx=0
        this.vy=this.speed
        
    },

    Move:function(dt,vx,vy){
        this.node.y -= vy*dt

    },

    update (dt) {
       this.Move(dt,this.vx,this.vy)
    },

    checkDead: function(){
        return this.node.y <-1220
    },
});
