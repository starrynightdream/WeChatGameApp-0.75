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
        engShow : {
            default: null,
            type : cc.ProgressBar,
        },
        eShower : {
            default : [],
            type : cc.ProgressBar,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.reSetConBar();
    },

    update (dt) {
        this.engShow.progress = this.engE;
        for (let i=0; i<5;i++){
            this.eShower[i].progress = Math.abs(this.pcE[i]);
        }
    },

    /**
     * 重置控制器
     */
    reSetConBar (){
        this.engE = 0;
        this.pcE = [];
        this.bar.progress = 0.5;
    },

    setEData (E, EL){
        this.engE = E;
        this.pcE = EL;
    },

    toStr (){
        let str = "E: " + Math.round(this.engE *1000)/10 + "  PC: ";
        this.pcE.forEach(element => {
            str += Math.round(element *1000)/10 + ", ";
        });
        return str;
    },
});
