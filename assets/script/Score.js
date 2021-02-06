// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        show:{
            default:null,
            type:cc.Label,
            tip:"分数展示"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.reSetScore()
    },

    update (dt) {
        if (this.active){
            this.time += dt
            if (this.time > 1){ 
                //每秒更新
                this.time = 0
                this.score += this.autoAdd
            }

            // 更新表示
            this.show.string = this.toStr()
        }
    },

    /**
     * 初始化计分板
     */
    reSetScore:function(){
        this.score = 0
        this.autoAdd = 0
        this.time = 0
        this.active = false
    },

    /**
     * 直接加分
     * @param {*} score 加的分数
     */
    addScore:function(score){
        this.score += score
    },

    /**
     * 开始计分
     * @param {*} k 自动增长速度
     */
    start:function(k){
        this.active = true
        this.time = 0
        this.autoAdd = k
    },

    /**
     * 停止操作
     */
    stop:function(){
        this.active = false
    },

    /**
     * 设置或查询分数增长
     * @param {*} k 每秒分数增长，可为空
     */
    scorePerSecond:function(k){
        if (k){
            this.autoAdd = k
        }
        return this.autoAdd
    },

    /**
     * 分数显示
     */
    toStr:function(){
        return Math.round(this.score)
    },
});
