// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const Item = require('Item');

cc.Class({
    extends: Item,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.dead = false;
    },
    createItem (xp){
        this.node.y = 1230;
        this.node.x = xp;
    },
    // update (dt) {},

    getItem(rocket){
        rocket.engine.changeEng(2, 20);
        this.dead = true;
    },

    checkDead (){
        return this.y < -1200 || this.dead; 
    }
});
