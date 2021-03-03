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
const Item = require('Item');
const UIControl = require('UIControl');
const Score = require('Score');
const Cloud = require('Cloud');
const AudioSys = require('AudioSys');
const GameEventSys = require('GameEventSys');

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        // 清除本地的缓存
        cc.assetManager.cacheManager.clearCache();
        // 获取屏幕宽度
        this.width = 1080;
        this.ItemList = [];
        this.itemType = {};
        this.gameStart = false;
        this.audioSys = this.getComponent(AudioSys);

        this.loadList = [
            'BadBattery',
            'GoodBattery',
            'meteoriteItem',
            'rubbishItem',
            'ufoItem',
            'SunEng',
            'WindEng',
        ];
        cc.assetManager.loadBundle('preform', (err, bundle) =>{
            
            if (err) throw err;
            else {
                this.bundle = bundle;

                this.loadList.forEach(name =>{
                    
                    bundle.load(`Item/${name}`, cc.Prefab, (err, preform) =>{

                        if (err){
                            this.itemType[name] = undefined;
                            console.log('err: '+err);
                        }else{
                            this.itemType[name] = preform;
                        }
                    });
                });
            }
            
            this.gameEve = this.getComponent(GameEventSys);
            this.gameEve.createShower(); 
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
            let nowItem = this.ItemList[i];
            let isDed = false;
            if (nowItem.checkDead()) {
                nowItem.destroyItem();
                isDed = true;
            }

            if (nowItem.needAudio()){
                // 声音
                this.audioSys.play(nowItem.audioType());
            }

            if (nowItem.needBGM()){
                nowItem.setBGMId( this.audioSys.play( nowItem.bgmType()));
            }

            if (nowItem.needKillBGM()){
               this.audioSys.stopPlay( nowItem.getBGMId()); 
            }

            if (isDed){
                this.ItemList.splice(i, 1);
            }
        }

        // 判断是否生成新关卡，逻辑需要变更
        if (this.toNextLevel()) {
            this.createLevel(this.levelType());
        }

        if (this.checkEvent()) {
            this.callEvent();
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

        this.gameEve.reSetAllEve();

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
        this.rocket.setWast(1);
        
        this.gameStart = true;

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
        return this.ItemList.length < 3;
    },

    /**
     * 创建何种类型的关卡
     */
    levelType (){
        let levelCode = Math.floor(Math.random() * 100) % 4;
        return Math.max(levelCode -1, 0);
    },

    /**
     * 创建各类道具，形成关卡
     * @param {number} type 指定创建物件的类型。默认0为随机
     */
    createLevel(type = 0) {
        // 具体逻辑需要变更，如添加数个物件的逻辑等
        switch (type){
            case 0:
                let hinderCode = Math.floor(Math.random() * 100) % 6;
                const itemParams = {
                    needPos : true,
                    isUFO : false,
                };

                // 依据code控制障碍的生成
                switch(hinderCode){
                    case 0:
                    case 1:
                        this.createItemByName('rubbishItem', itemParams);
                        break;
                    case 2:
                        itemParams.isUFO = true;
                        this.createItemByName('ufoItem', itemParams);
                        break;
                    case 3:
                        this.createItemByName('meteoriteItem', itemParams);
                        break;
                    case 4:
                        this.createItemByName('birdItem', itemParams);
                        break;
                    case 5:
                    default:
                        this.createItemByName('rubbishItem', itemParams);
                        break;
                }

                break;
            case 1:
                // 电池
                let batteryCode = Math.floor(Math.random() * 100) % 2;
                const batteryParams = {
                    needPos : true,
                };

                switch(batteryCode){
                    case 0:
                        this.createItemByName('BadBattery', batteryParams);
                        break;
                    case 1:
                    default:
                        this.createItemByName('GoodBattery', batteryParams);
                        break;
               }
               break;
            case 2:
                // 引擎
                let engCode = Math.floor(Math.random() * 100) % 2 +1;
                const engParams = {
                    needPos : true,
                };

                switch(engCode){
                    case 1:
                        this.createItemByName('WindEng', engParams);
                        break;
                    case 2:
                        this.createItemByName('SunEng', engParams);
                        break;
                    default:
                }
                break;
            default:

        }
        // 第几个障碍

        return this;
    },

    /**
     * 通过名称创建预制体
     * @param {string} name 物件的名称
     * @param {object} param 各类参数
     */
    createItemByName (name, param) {

        if (this.itemType[name]){

            param.preform = this.itemType[name];
            this.createItemForLevel(param);
        }else{

            this.bundle.load(`Item/${name}`, cc.Prefab, (err, preform) =>{
                if (err) return;
                else{
                    this.itemType[name] = preform;
                    param.preform = preform;
                    this.createItemForLevel(param);
                }
            });
        }
    },

    /**
     * 创建一个物体并加入管理器中
     * @param {cc.Prefab} preform 需要生成物件的预制体
     * @param {Boolean} needPos 是否需要使用位置(cc.v2)初始化
     */
    createItemForLevel ({preform, needPos = false, isUFO = false}) {
        
        if (!preform){
            return this;
        }
        // 位置种子
        const seed = Math.random() * this.width - this.width / 2;

        const item = cc.instantiate(preform);
        let itemSpt = item.getComponent(Item);

        const parObj = {};

        if (needPos){
            parObj.startPos = cc.v2(seed, 1200);
        }
        if (isUFO){
            parObj.startPos = cc.v2(-500, 400);
            parObj.phase = Math.random() *5;
            parObj.speed = 100;
        }
        
        itemSpt.createItem(seed, this.rocket, util.moveLogicParam(parObj));

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
     */
    callEvent() {

        let eveCode = Math.floor(Math.random() * 100) %2;
        let posCode = Math.floor(Math.random() * 2000) % this.width - this.width/2;
        if (eveCode == 1){
            // 太阳
            this.gameEve.eventWarn('sun', posCode);
        }else{
            //风
            this.gameEve.eventWarn('wind', posCode);
        }
    },

    /**
     * 根据状态进行事件判断
     */
    checkEvent() {
        this.gameEve.reFlesh(this.rocket);
        return Math.floor(Math.random() * 1000) % 500 < 1;
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
