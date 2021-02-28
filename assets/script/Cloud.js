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
            default: 1,
            type: cc.Float,
            tooltip: "自动清洁能力",
        },

        move:{
            default: 500,
            type: cc.Float,
            tooltip: "可以承受的最大污染移动距离",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 开始位置
        this.startLine = this.node.y; 
        // 获取子节点中的云
        if (this.node.childrenCount > 0) {
            this.childCloud = this.node.children[0];
        }
        this.ps = this.node.getComponent(cc.ParticleSystem);
        this.cps = this.childCloud.getComponent(cc.ParticleSystem);
        this.reSetCloud();
    },

    update (dt) {
        // 若超出界限便自动清洁
        if (this.p > this.limit){
            this.p -= this.autoC * dt;
        }

        this.childCloud.y = -this.p;
        this.node.y = this.startLine - this.K * this.p;
    },

    /**
     * 重置云层为初始状态
     */
    reSetCloud () {
        // 污染值， 取值0-500
        this.p = 0; 
        this.cloudStop();
        // 污染时乌云移动的距离
        this.K = this.move / 500;

        // 重置云层位置
        this.childCloud.y = 0;
        this.node.y = this.startLine;
        
        return this;
    },

    /**
     * 反映污染
     * 若为开始污染，则直接进入最低污染状态
     * @param {Number} k 污染的程度
     */
    pollute (k) {

        if (this.p === 0){
            this.p = this.limit;
            this.cloudStart();
            return this;
        }
        this.p = Math.min(this.p + k * this.sP, 500);
        return this;
    },

    // 下方两函数不应该使用active，这使得画面切换不流畅
    /**
     * 终止投射粒子
     */
    cloudStop() {
        this.ps.resetSystem();
        this.cps.resetSystem();
        this.node.active = false;
        return this;
    },

    /**
     * 开始投射粒子
     */
    cloudStart() {
        this.node.active = true;
        return this;
    },
});
