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
        this.node.y = 1230
    },

    createItem: function(xp){
        if (xp < 0){
            this.node.x = -290
        }else{
            this.node.x = 290
        }
    },

    checkDead: function(){
        return this.node.y <-1220
    },
    
    getItem: function(rocket){
        rocket.death()
    },
    
    Move: function(dt ,vy){
        this.node.y -= vy *dt *4
    }
    // update (dt) {},
});
