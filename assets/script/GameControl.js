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

const Rocket = require('Rocket');
const Item = require("Item");
const UIControl = require("UIControl");
const Score = require("Score");
const Cloud = require("Cloud");

const util = require("util");
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

        // 测试逻辑，需在发布前删除
        ItemTestList: {
            default: [],
            type: cc.Prefab,
            tooltip: "需要测试的物件连接到此处，游戏开始时会进行生成"
        }
        // 测试逻辑部分终止
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // 获取屏幕宽度
        this.width = 1080;
        this.ItemList = [];
        this.gameStart = false;

        // 所有允许被初始化的物件设定
        // 电池类型
        this.batteryType = [
            {
                itemName : 'BadBattery',
                p : 1,
            },
            {
                itemName : 'GoodBattery',
                p : 2,
            },
        ];

        this.hinderType = [
            {
                itemName : 'meteoriteItem',
                p : 1,
            },
            {
                itemName : 'rubbishItem',
                p : 3,
            }
        ];
        cc.assetManager.loadBundle('preform', (err, bundle) =>{
            
            if (err) throw err;
            else {
                this.bundle = bundle;
            }
        });
    },

    update(dt) {

        if (!this.gameStart){
            return;
        }
        // 移动所有item
        let vy = this.rocket.Vy();

        this.ItemList.forEach(element => {
            element.Move(dt, vy, this.rocket.node);
        });

        // 物件是否需要销毁
        for (let i = this.ItemList.length - 1; i > -1; i--) {

            if (this.ItemList[i].checkDead()) {
                this.ItemList[i].destroyItem();
                this.ItemList.splice(i, 1);
            }
        }
        // 判断是否生成新关卡，逻辑需要变更
        if (this.toNextLevel()) {
            this.createLevel();
        }
    },


    /**
     * 游戏结束
     * 
     * 此时分数进入总结
     */
    GameOver () {

        this.ItemList.forEach(element => {
            element.destroyItem()
        });
        this.ItemList.splice(0);

        this.UIControl.GameOver();
        this.cloud.reSetCloud();
        this.score.reSetScore();
        this.rocket.reSetRocket();

        this.gameStart = false;

        return this;
    },

    /**
     * 游戏开始
     * 
     * 此时游戏正式开始进入循环，移动物件，计算油耗得分。
     */
    GameStart () {
        this.UIControl.GameStart();
        this.score.intoGame(1);
        this.rocket.intoGame();
        
        this.gameStart = true;

        // 测试逻辑
        this.ItemTestList.forEach(element =>{
            this.createItemForLevel(element);
        });
        // 测试逻辑部分终止

        return this;
    },

    /**
     * 游戏等待开始
     * 
     */
    GameWait () {
        this.UIControl.GameWait();
        
        return this;
    },

    /**
     * 加分
     * @param {number} score 添加多少分数
     */
    addScore (score) {
        this.score.addScore(score);
        return this;
    },

    /**
     * 是否进入下一关的判断
     */
    toNextLevel (){
        return this.ItemList.length < 5;
    },

    /**
     * 创建各类道具，形成关卡
     */
    createLevel() {
        // 具体逻辑需要变更，如添加数个物件的逻辑等
        // 第几个障碍
        let code = Math.floor(Math.random() * 100) % (this.ItemTypeList.length);

        const itemParams = {
            needPos : true,
        };
        this.createItemForLevel(this.ItemTypeList[code], itemParams);

        return this;
    },

    /**
     * 创建一个物体并加入管理器中
     * @param {cc.Prefab} preform 需要生成物件的预制体
     * @param {Boolean} needPos 是否需要使用位置(cc.v2)初始化
     */
    createItemForLevel (preform, needPos = false) {
        // 位置种子
        const seed = Math.random() * this.width - this.width / 2;

        const item = cc.instantiate(preform);
        let itemSpt = item.getComponent(Item);

        if (needPos){
            itemSpt.createItem( seed, this.rocket, util.moveLogicParam( cc.v2( seed, 1200)));
        }else{
            itemSpt.createItem(seed, this.rocket, util.moveLogicParam());
        }
        this.Canvas.addChild(item);
        this.ItemList.push(itemSpt);

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
        return this;
    },

    /**
     * 通过UI显示信息
     * @param {string} info 需要显示的信息
     * @param {Number} type 显示信息的类型
     */
    info (info) {
        this.UIControl.info(info, type);
        return this;
    }
});
