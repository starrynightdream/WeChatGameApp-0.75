// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 需要结束游戏/死亡等
 * 请调用rocket里的death方法
 * 而不是使用GC中的GameOver方法
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 屏幕宽度
        this.width = 1080
    },

    // update (dt) {},

    /**
     * 创建一个物件，请默认将物件初始化在上方屏幕外
     * 默认情况下物件会在屏幕上方被初始化，并且x位置为0
     * @param {*} xp 一个 -屏幕宽度/2 到 屏幕宽度/2 的数据，用于初始化物件位置
     */
    createItem: function(xp){
        ;
    },

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
     * @param {*} rocketX 火箭的x坐标
     */
    Move(dt, vy, rocketX){
        // 不重写则默认自然向下
        this.node.y -= vy *dt
    }
});
