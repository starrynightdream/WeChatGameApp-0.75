// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 发动机类型
        type:{
            default:0,
            type:cc.Integer,
        },
        // 内部能源
        E:{
            default:0,
            type:cc.Integer,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    /**
     * 初始化发动机
     */
    initEng: function(){
        ;
    },

    /**
     * 变更当前发动机类型
     * @param {*} type 发动机类型
     * @param {*} E 发动机初始能源
     */
    changeEng: function(type, E){
        ;
    },

    /**
     * 添加能源
     */
    addE: function(){
        ;
    },

    /**
     * 使用能量
     * @param {*} wast 使用量
     */
    use:function(wast){
        ;
    }
});
