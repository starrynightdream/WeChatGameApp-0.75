// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Hinder = require("Hinder")

cc.Class({
    extends: Hinder,

    properties: {
        
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //获取屏幕分辨率
        var viewSize=cc.view.getDesignResolutionSize()
        console.log(viewSize)
        this.createItem(cc.v2(Math.random()*viewSize.width-viewSize.width/2,-100+viewSize.height/2))
    },

    start () {
    },

    createItem(xp, rocket,param){
        this._super(xp, rocket,param)
        //设置陨石移动模式
        this.setMoveLogic()
    },
    /**
     *@param speed [cc.Float]设置陨石移动速度
     */
    setMoveLogic(){
        //根据火箭于出生点的坐标对陨石进行旋转
        this.dir=this.rocketPos.sub(this.startPos)
        this.degree=this.dir.signAngle(cc.v2(1,0))
        this.angle=cc.misc.radiansToDegrees(this.degree)
        this.node.rotation=-90+this.angle
        //设置火箭速度，火箭在x，y方向移动的速度
        this.vx=-this.speed*Math.cos(this.degree)
        this.vy=this.speed*Math.sin(this.degree)
    },

    Move:function(dt,vx,vy){
        this.node.x -= vx *dt
        this.node.y -= vy *dt
    },

    checkDead: function(){
        return this.node.y <-1220
    },
});
