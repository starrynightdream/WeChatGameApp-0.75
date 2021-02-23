// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const wind = require('wind');

cc.Class({
    extends: cc.Component,

    properties: {
        windShower : {
            default: null,
            type: wind,
            tooltip : '风效果的表示对象'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    // update (dt) {},

    /**
     * 事件的预警
     * @param {string} type 事件类型
     * @param {Number} xpos 参数x位置
     */
    eventWarn (type, xpos = 0) {
        switch (type){
            case 0: //风吹事件的预警
                //在此处完成对风事件预警的调用
        }
    },

    /**
     * 
     * @param {string} type 事件类型
     */
    eventCall (type){
        switch (type){
            case 0: // 风吹事件的调用
                // 调用风出现
        }
    },

    /**
     * 
     * @param {string} type 事件类型
     */
    eventEnd (type) {
        switch (type) {
            case 0: // 风吹结束
                // 此处调用风吹结束
        }
    },

});

