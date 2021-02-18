var Item = require("Item")

cc.Class({
    extends: Item,
    /**
     * startPos 障碍物生成位置
     * rocketPos 障碍物生成时火箭的位置
     * angle 障碍物的旋转角度
     * speed障碍物的移动速度
     */
    properties: {
        startPos:cc.Vec2,
        rocketPos:cc.Vec2,
        rocket:cc.Node,
        angle:0,
        speed:cc.Float,
        bias:0,
        amplitude:cc.Float,
        angularVelocity:cc.Float,
        phase:cc.Float
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 屏幕宽度
        this.width = 1080;
    },

    createItem (xp, rocket, param){
        this.rocket = rocket
        this.setPos(param["startPos"], this.rocket.node.position)
        // param=Item.moveLogicParam()
        this.setMoveLogicParam(param)
    },

    /**
     * @param {param}  [cc.v2] 物体的初始位置
     * @param {rocketPos} [cc.v2] 火箭的位置
     */
    setPos(startPos,rocketPos){
        //出生点的位置初始化，必须用cc.v2初始化
        this.startPos=startPos
        this.node.position=this.startPos
        //火箭的坐标
        this.rocketPos=rocketPos
    },
    /**
     * 设置障碍物移动模式的参数
     * @param param移动模式参数的json对象
     */
    setMoveLogicParam(param){
        this.speed=param["speed"]
        this.amplitude=param["amplitude"]
        this.angularVelocity=param["angularVelocity"]
        this.phase=param["phase"]
    },
    /**
     * 设置障碍物移动模式
    */
    setMoveLogic(){
    },

    /**
     * @param {Rocket} rocket 火箭类
     */
    getItem (rocket){
        return rocket;
    },
    getRocketPosition(){
        return getItem().position
    },
});
