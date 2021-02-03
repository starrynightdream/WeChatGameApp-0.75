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
 * 游戏控制类
 */

var Rocket = require('Rocket')
var Item = require("Item")

cc.Class({
    extends: cc.Component,

    properties: {
    
        // 计分板
        srore: {
            default:null,
            type: cc.Node, 
            tooltip:"游戏计分板"
        },
        // 火箭
        rocket:{
            default: null,
            type: Rocket, 
            tooltip:"火箭"
        },
        // 乌云
        cloud:{
            default: null,
            type:cc.Node, 
            tooltip:"乌云"
        },
        // item物件列表
        ItemList:{
            default:[],
            type: Item, 
            tooltip:"记录所有生成的item"
        },
        // 记录所有预制体
        ItemTypeList: {
            default: [],
            type: cc.Prefab, 
            tooltip:"提供预制体让其生成"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    update (dt) {

        // 移动所有item
        let vy = this.rocket.Vy()
        this.ItemList.forEach(element => {
            if (! element){
                console.log(element)
                return
            }
            element.Move(dt, vy)
            if (element.checkDead()){
                element.destroyItem()
            }
        });

        
    },

 
    /**
     * 游戏结束
     */
    GameOver : function(){
        ;
    },

    /**
     * 游戏开始
     */
    GameStart: function(){
        ;
    },

    /**
     * 游戏等待开始
     */
    GameWait: function(){
        ;
    },

    /**
     * 加分
     * @param {*} num 添加多少分数
     */
    addScore: function(num) {
        ;
    },

    /**
     * 创建各类道具，形成关卡
     */
    createLevel: function(){
        ;
    },

    /**
     * 污染大气
     * @param {Float} k 污染指数
     */
    pollute: function(k){
        ;
    },

    /**
     * 触发函数，如太阳光、风流、拾取电池等事件发生时可调用
     * @param {*} type 事件类型，具体另作定义
     */
    callEvent: function(type){
        // 各类事件具体处理逻辑填写在此处
        ;
    }
});
