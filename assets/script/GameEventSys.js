// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const EventB = require('EventBase');

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
     * 创建用于表示事件的物件
     */
    createShower (){
        this.bundle = cc.assetManager.getBundle('preform');
        this.bundle.load('EvePreform/wind', cc.Prefab, (err, perform) =>{
            
            if (err){
                console.log(`err when load wind obj`);
                this.wind = undefined;
            }else{
                this.wind = cc.instantiate(perform).getComponent(EventB);
                this.wind.node.parent = this.node;
            }
        });

        this.bundle.load('EvePreform/sun', cc.Prefab, (err, perform) =>{
            
            if (err){
                console.log(`err when load sun obj`);
                this.sunPre = undefined;
            }else{
                this.sun = cc.instantiate(perform).getComponent(EventB);
                this.sun.node.parent = this.node;
            }
        });
    },

    /**
     * 事件的预警
     * @param {string} type 事件类型
     * @param {Number} xpos 参数x位置
     */
    eventWarn (type, xpos = 0) {
        switch (type){
            case 'wind': //风吹事件的预警
                if (this.wind && this.wind.eventEnd()){
                    this.wind.warn(xpos);
                }
            case 'sun':
                if (this.sun && this.sun.eventEnd()){
                    this.sun.warn(xpos);
                }
            default:
        }
    },

    /**
     * 事件开始
     * @param {string} type 事件类型
     */
    eventCall (type){
        switch (type){
            case 'wind': // 风吹事件的调用
                this.wind.enter();
            default:
        }
    },

    /**
     * 事件借宿
     * @param {string} type 事件类型
     */
    eventEnd (type) {
        switch (type) {
            case 'wind': // 风吹事件的结尾
                this.wind.leave();
            default:
        }
    },

    /**
     * 
     * @param {Rocket} rocket 火箭的引用 
     */
    reFlesh (rocket){
        if (this.wind)
            this.reFleshProcess(this.wind, rocket);
        if (this.sun)
            this.reFleshProcess(this.sun , rocket);
    },

    reFleshProcess (eve, {rocket}) {

        if (eve.eventEnd()){
            eve.reSetEve();
        } else{

            if (eve.toWork()){

                eve.enter();
            }else if (eve.toLeave()){

                eve.leave();
            }else if (eve.eventWork()){

                if ( eve.inRange(rocket.node.position)){
                    eve.makeEff(rocket);
                }
            }
        }
    },

    /**
     * 重置所有事件
     */
    reSetAllEve (){
        if (this.wind)
            this.wind.reSetEve();

        if (this.sun)
            this.sun.reSetEve()
    }
});
