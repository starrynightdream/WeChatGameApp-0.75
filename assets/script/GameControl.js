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

const Rocket = require('Rocket')
const Item = require("Item")
const UIControl = require("UIControl")
const Score = require("Score")
const Cloud = require("Cloud")

cc.Class({
    extends: cc.Component,

    properties: {

        // 计分板
        score: {
            default: null,
            type: Score,
            tooltip: "游戏计分板"
        },
        // 火箭
        rocket: {
            default: null,
            type: Rocket,
            tooltip: "火箭"
        },
        // 乌云
        cloud: {
            default: null,
            type: Cloud,
            tooltip: "乌云"
        },
        // ui控制器
        UIControl: {
            default: null,
            type: UIControl,
            tooltip: "UI控制"
        },
        Canvas: {
            default: null,
            type: cc.Node,
            tooltip: "容器节点",
        },
        // 记录所有预制体
        // 需要在之后变更为在指定文件夹中动态加载物件
        ItemTypeList: {
            default: [],
            type: cc.Prefab,
            tooltip: "提供预制体让其生成"
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // 获取屏幕宽度
        this.width = 1080
        this.ItemList = []
    },

    update(dt) {

        // 移动所有item
        let vy = this.rocket.Vy()
        this.ItemList.forEach(element => {
            element.Move(dt, vy, this.rocket.node)
        });

        for (let i = this.ItemList.length - 1; i > -1; i--) {

            if (this.ItemList[i] && this.ItemList[i].checkDead()) {
                this.ItemList[i].destroyItem()
                this.ItemList.splice(i, i + 1)
            }
        }
        // 判断是否生成新关卡
        if (this.ItemList.length == 0) {
            this.createLevel()
        }
    },


    /**
     * 游戏结束
     */
    GameOver: function () {
        this.ItemList.forEach(element => {
            element.destroyItem()
        });
        this.ItemList.splice(0);
        this.UIControl.GameOver();
        this.score.reSetScore();
        this.cloud.reSetCloud();

        return this;
    },

    /**
     * 游戏开始
     */
    GameStart: function () {
        this.rocket.reSetRocket()
        this.UIControl.GameStart()
        this.score.start(1)
        return this;
    },

    /**
     * 游戏等待开始
     */
    GameWait: function () {
        this.UIControl.GameWait()
        
        return this;
    },

    /**
     * 加分
     * @param {number} score 添加多少分数
     */
    addScore (score) {
        this.score.addScore(score)
        return this;
    },

    /**
     * 创建各类道具，形成关卡
     */
    createLevel() {
        // 具体逻辑需要变更
        // 位置种子
        const seed = Math.random() * this.width - this.width / 2
        // 第几个障碍
        let code = Math.floor(Math.random() * 100) % (this.ItemTypeList.length-2) +2;

        let item = cc.instantiate(this.ItemTypeList[code])
        var itemScr = item.getComponent("Item")
        itemScr.createItem(seed)
        this.Canvas.addChild(item)
        this.ItemList[this.ItemList.length] = itemScr
        return this;
    },

    /**
     * 污染大气
     * @param {number} k 污染指数
     */
    pollute(k) {
        this.cloud.pollute(k);
        return this;
    },

    /**
     * 触发函数，如太阳光、风流、拾取电池等事件发生时可调用
     * @param {*} type 事件类型，具体另作定义
     */
    callEvent(type) {
        // 各类事件具体处理逻辑填写在此处
        ;
        return this;
    },

    /**
     * 通过UI显示信息
     * @param {*} info 需要显示的信息
     */
    info: function (info) {
        this.UIControl.info(info)
        return this;
    }
});
