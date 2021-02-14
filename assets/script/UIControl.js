// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var UI = require("UI")

cc.Class({
    extends: cc.Component,

    properties: {
        starBut:{
            default:null,
            type:UI,
            tooltip:"开始按钮"
        },
        sliderBar:{
            default:null,
            type:UI,
            tooltip:"控制火箭的控制板" 
        },
        Score:{
            default:null,
            type:UI,
            tooltip:"分数显示板"
        },
        InfoTip:{
            default:null,
            type:UI,
            tooltip:"右上角提示",
        },
        StarInfo:{
            default:null,
            type:UI,
            tooltip:"开始界面的信息滚动",
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameOver()
    },

    // update (dt) {},

    GameStart:function(){
        this.sliderBar.show()
        this.starBut.hide()
        this.Score.show()
    },

    GameOver:function(){
        this.sliderBar.hide()
        this.starBut.show()
        this.Score.hide()
    },

    GameWait:function(){
    },

    /**
     * 显示信息
     * @param {string} info 信息内容
     * @param {Number} type 消息类型
     */
    showInfo:function(info){
        // 此处需要实现根据不同类型的信息，调用不同组件进行显示
        this.InfoTip.info(info)
    },
});
