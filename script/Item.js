// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        DeadLine:{
            default:0,
            type: cc.Float
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    /**
     * 对火箭做什么 实现请继承
     * @param {Rocket} rocket 火箭类
     */
    getItem: function(rocket){
        ;
    },

    /**
     * 对游戏做什么 
     * 实现请继承
     * @param {GameControl} GC 游戏控制器
     */
    setGame: function(GC){
        ;
    },
    
    /**
     * 判断是否应该摧毁的函数
     */
    checkDead: function(){
        return false;
    },

    /**
     * 销毁item
     */
    destroyItem: function(){

        if (this.node){
            this.node.destroy()
        }
    },
    
    /**
     * 移动方法
     * @param {*} dt 时间间隔
     * @param {*} vy 飞船时间间隔
     */
    Move(dt, vy){
        this.node.y -= vy *dt
    }
});
