// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        limit:{
            default: 10,
            type: cc.Float,
            tooltip: "自然恢复的界限",
        },

        sP:{
            default: 1,
            type: cc.Float,
            tooltip: "对污染的敏感度",
        },

        autoC:{
            default:1,
            type:cc.Float,
            tooltip:"自动清洁能力",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.p = 0; // 污染值
    },

    update (dt) {
        // 若超出界限便自动清洁
        if (this.p > this.limit){
            this.p -= this.autoC * dt;
        }
    },


    /**
     * 反映污染
     * @param {Number} k 污染的程度
     */
    pollute (k) {
        this.p += k * this.sP;
    },
});
