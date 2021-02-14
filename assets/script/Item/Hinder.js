var Item = require("Item")

cc.Class({
    extends: cc.Component,

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
        angle:cc.Float,
        speed:cc.Float
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 屏幕宽度
        this.width = 1080;
    },

    // update (dt) {},


    /**
     * @param {xp}  [cc.v2] 物体的初始位置
     * @param {rocketPos} [cc.v2] s火箭的位置
     */
    setPos(xp,rocketPos){
        //出生点的位置初始化，必须用cc.v2初始化
        this.startPos=xp
        this.node.position=this.startPos
        //火箭的坐标
        this.rocketPos=rocketPos
    },
    /**设置障碍物移动模式
    *@param speed [cc.Float]设置障碍移动速度
    */
    setMoveLogic(speed){
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


    /**
     * 对游戏做什么 
     * 实现请继承
     * @param {GameControl} GC 游戏控制器
     */
    setGame (GC){
        ;
    },
    
    /**
     * 判断是否应该摧毁的函数
     */

    /**
     * 销毁item
     */
    destroyItem (){
        if (this.node){
            this.node.destroy();
        }
    },
    
});