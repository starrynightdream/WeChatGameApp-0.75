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
var ControlBar = require("ControlBar")

cc.Class({
    extends: cc.Component,

    properties: {
        // 步长
        step:{
            default:10,
            type: cc.Integer,
            tooltip:"步长"
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
        // 控制版面
        controlBar:{
            default:null,
            type:ControlBar,
            tooltip:"控制滑动板"
        },

        gameControlNode:{
            default: null,
            type: cc.Node,
            tooltip:"游戏控制器的节点"
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    /**
    * 动画方面
    */
    rocketBroke(){
        rocketBroke=this.node
        cc.assetManager.loadBundle('preform', (err, bundle) => {

            if (err){
                console.log(err)
            }
            bundle.load("Rocket/spiteItem", cc.Prefab, function (err, prefab) {
                let spiteItem = cc.instantiate(prefab);
                rocketBroke.addChild(spiteItem)
            });
            bundle.load("Rocket/explodeItem", cc.Prefab, function (err, prefab) {
                let exploreItem = cc.instantiate(prefab);
                rocketBroke.addChild(exploreItem)
            });
        });
    },

    rocketStarted(){
        rocketBroke=this.node
        cc.assetManager.loadBundle('preform', (err, bundle) => {

            if (err){
                console.log(err)
            }
            
            bundle.load("Rocket/flameItem", cc.Prefab, function (err, prefab) {
                let flameItem = cc.instantiate(prefab);
                rocketBroke.addChild(flameItem)
                flameItem.setPosition(0,-193.168,0)
                console.log(flameItem)
            });
        });
    }

    

});
