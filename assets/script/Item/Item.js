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
 * 脚本请根据物品的分类，将后缀名称变更为： 障碍物：Hinder/ 收集品:Collection/ 电池:Hinder/ 发动机:Eng
 * 如：普通障碍物的脚本物件命名为  NormalHinder.js
 * 
 * 需要结束游戏/死亡等
 * 请调用rocket里的death方法
 * 而不是使用GC中的GameOver方法
 * 
 * item 无需实现update，其移动会被GameControl统一管理和进行
 * 
 * 请注意编码规范
 */

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 屏幕宽度
        this.width = 1080;
    },

    // update (dt) {},

    /**
     * 创建一个物件，请默认将物件初始化在上方屏幕外
     * 默认情况下物件会在屏幕上方被初始化，并且x位置为0
     * 
     * 请在此处初始化物件的位置等信息
     * 
     * @param {Number} xp 一个 -屏幕宽度/2 到 屏幕宽度/2 的数据，用于初始化物件位置
     * @param {Object} rocket 火箭，通过这个获取火箭数据从而初始化物件
     * @param {Object} param 一个通过全局工具类生成的对象，用于初始化障碍运动逻辑
     */
    createItem (xp, rocket, param){
    },

    /**
     * 对火箭做什么 实现请继承
     * 
     * 其中的火箭由碰撞时由rocket注入，请勿主动调用
     * 
     * @param {Rocket} rocket 火箭类
     */
    getItem (rocket){
    },

    /**
     * 对游戏做什么, 实现请继承
     * 
     * 其中的GC由碰撞时由rocket注入，请勿主动调用
     * 
     * @param {GameControl} GC 游戏控制器
     */
    setGame (GC){
    },
    
    /**
     * 判断是否应该摧毁的函数
     * 
     * 当决定销毁物件的时候，请设置该函数的返回值为true而非自行销毁
     * 动态生成的物件务必实现，请勿自行进行物件的销毁
     */
    checkDead (){
        return false;
    },

    /**
     * 销毁item
     * 
     * 仅实现物件在销毁的时候所做的逻辑操作
     * 请勿自行调用
     */
    destroyItem (){

        if (cc.isValid(this.node))
            this.node.destroy();
        return this;
    },
    
    /**
     * 移动方法
     * 由GameControl统一调用移动，无需自行调用
     * 
     * @param {*} dt 时间间隔
     * @param {*} vy 飞船时间间隔
     * @param {*} rocketNode 火箭的Node引用
     */
    Move(dt, vy, rocketNode){
        // 不重写则默认自然向下
        this.node.y -= vy *dt;
        return this;
    }
});
