// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        EMAX:{
            default:100,
            type:cc.Integer,
            tooltip:"最高能量"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.type = 0;
        this.E = 0;
    },

    // update (dt) {},

    /**
     * 初始化发动机
     * 
     * @param E 初始化的能量
     */
    reSetEng (E = 10){
        this.type = 0;
        this.E = 10;

        return this;
    },

    /**
     * 变更当前发动机类型
     * @param {*} type 发动机类型
     * @param {*} E 发动机初始能源
     */
    changeEng (type, E){
        this.type = type;
        this.E = E;

        return this;
    },

    /**
     * 添加能源
     * @param {Number} e 添加的能量
     */
    addE (e){
        this.E = Math.min(this.E + e, this.EMAX);

        return this;
    },

    /**
     * 使用能量
     * @param {Number} wast 使用量
     * @returns {Float} 不足的部分
     */
    use (wast){
        let dis = wast - this.E;
        this.E = Math.max(-dis, 0);
        return Math.max(dis, 0);
    },
});
