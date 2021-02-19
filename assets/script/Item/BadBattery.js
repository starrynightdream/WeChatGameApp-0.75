// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Item = require("Item")

cc.Class({
    extends: Item,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.dead = false;
    },

    // update (dt) {},

    createItem (xp){
        this.node.y = 1230;
        this.node.x = xp;
        this.E = 20;
    },

    getItem (rocket){
        rocket.addE(false, this.E);
        this.dead = true;
    },

    setGame (GC){
    },

    checkDead (){
        return this.node.y <-700 || this.dead;
    },

    Move (dt ,vy){
        this.node.y -= vy *dt *3;
    },
});
