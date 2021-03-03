const UI = require('UI');
cc.Class({
    extends: UI,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    show (){
        cc.tween(this.node)
            .delay(3)
            .to(0.5, {opacity:255})
            .start();
    },
    start () {

    },

    // update (dt) {},
});
