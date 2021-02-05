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

    show:function(){
        var action = cc.fadeIn(0.5)
        this.node.runAction(action)
    },

    hide:function(){
        var action = cc.fadeOut(0.5)
        this.node.runAction(action)
    },

    info:function(info){
        ;
    }
});
