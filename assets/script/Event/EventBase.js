// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    /**
     * 事件警告中
     * @param {Number} xpos 初始位置
     */
    warn (xpos = 0){},

    /**
     * 事件发生
     */
    enter (){},

    /**
     * 事件结束
     */
    leave (){},

    /**
     * 判断火箭是否在其作用范围之内
     * @param {cc.Vec2} rocketPos 火箭的位置
     */
    inRange (rocketPos){
        return false;
    },

    /**
     * 事件是否结束
     */
    eventEnd (){
        return false;
    },

    /**
     * 事件是否处于作用状态
     */
    eventWork (){
        return false;
    },

    /**
     * 是否前往工作
     */
    toWork (){
        return false;
    },

    /**
     * 是否前往结束
     */
    toLeave (){
        return false;
    },

    /**
     * 重置事件
     */
    reSetEve (){
    },

    /**
     * 对在范围中的火箭作用
     * @param {Rocket} rocket 火箭的引用 
     */
    makeEff (rocket) {
    },
});
