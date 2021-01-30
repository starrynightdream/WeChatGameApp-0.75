// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var PowerCore = require("PowerCore")
var Engine = require("Engine")

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // 步长
        step:{
            default:10,
            type: cc.Integer,
            tooltip:"步长"
        },
        // 速度
        speed: {
            default: 1,
            type: cc.Float,
            tooltip:"速度"
        },
        // 角度
        angle: {
            default: Math.PI /2,
            type:  cc.Float,
            tooltip:"弧度，0为朝右"
        },
        // 耗油量
        wast:{
            default: 1,
            type: cc.Float,
            tooltip:"能耗"
        },
        // 引擎
        engine:{
            default:null,
            type: Engine,
            tooltip:"引擎类"
        },
        // 能量槽
        powerCore:{
            default:null,
            type: PowerCore,
            tooltip:"能量槽类"
        },

        gameControlNode:{
            default: null,
            type: cc.Node,
            tooltip:"游戏控制器的节点"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var manager = cc.director.getCollisionManager()
        manager.enabled = true
        manager.enabledDebugDraw = true

        this.gameControl = this.gameControlNode.getComponent("GameControl")
    },

    update (dt) {
        // this.node.y += this.Vy() *dt *this.step
        this.node.x += this.Vx() *dt *this.step

        // 计算能耗

    },

    /**
     * 实现碰撞函数
     * @param {*} other 
     * @param {*} self 
     */
    onCollisionEnter: function(other, self){
        let Item = other.getComponent("Item")
        // 注入自身
        Item.getItem(this)
        // 注入游戏控制器
        Item.setGame(this.gameControl)
    },

    // 接口

    /**
     * 速度
     */
    V: function(){
        return this.speed
    },

    /**
     * 水平方向上的速度
     */
    Vx:function (){
        return this.speed *Math.cos(this.angle) *this.step
    },

    /**
     * 竖直方向的速度
     */
    Vy: function(){
        return this.speed *Math.sin(this.angle) *this.step
    },

    /**
     * 变更速度
     * @param {*} v 变更后的速度
     */
    setV: function(v) {
        this.speed = v
    },
    
    /**
     * 变更发动机类型
     * @param {Number} type 发动机的代号
     * @param {Float} E 发动机中的能量
     */
    setEng: function(type, E){
        ;
    },

    /**
     * 添加能量
     * @param {*} type 能量类型
     * @param {*} E 能量大小
     */
    addE: function(type, E) {
        ;
    },

    /**
     * 设置火箭结束活动
     */
    death: function() {
        ;
    },

    /**
     * 返回当前能量槽
     */
    getE(){
        return [];
    },

    /**
     * 获取发动机类型
     */
    getEngType(){
        ;
    },

    /**
     * 获取发动机能量槽
     */
    getEngE(){
        ;
    },
});
