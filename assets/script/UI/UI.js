// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    /**
     * ui显示，默认动画为渐显
     */
    show:function(){
        var action = cc.fadeIn(0.5)
        this.node.runAction(action)
    },

    /**
     * ui隐藏，默认动画为渐隐
     */
    hide:function(){
        var action = cc.fadeOut(0.5)
        this.node.runAction(action)
    },

    /**
     * 信息的显示，需要则实现
     * @param {String} info 需要显示的消息
     */
    info:function(info){
        ;
    }
});
