// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        bar:{
            default:null,
            type:cc.Slider,
            tooltip:"滑动条"
        },
        label:{
            default:null,
            type:cc.Label,
            tooltip:"显示能源"
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.reSetConBar()
    },

    update (dt) {
        this.label.string = this.toStr()
    },

    /**
     * 重置控制器
     */
    reSetConBar: function(){
        this.engE = 0
        this.pcE = []
        this.bar.progress = 0.5
    },

    setEData: function(E, EL){
        this.engE = E
        this.pcE = EL
    },

    toStr:function(){
        let str = "E: " + Math.round(this.engE *1000)/10 + "  PC: "
        this.pcE.forEach(element => {
            str += Math.round(element *1000)/10 + ", "
        });
        return str
    },
});
