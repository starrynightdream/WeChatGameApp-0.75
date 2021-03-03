
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.sprite = this.node.getComponent(cc.Sprite);
        
        cc.assetManager.loadBundle('rubbType', (err, bundle) =>{

            if (err){
                console.log(`err when load bundle in randomrubbish`)
            }
            this.bundle = bundle;

            let theRT = 'r' + (Math.floor( Math.random() * 100) % 6 +1); 
            bundle.load( theRT, cc.Texture2D, (err, sp) =>{

                if (err){
                    console.log(`err when load ${theRT} sp in randomR err ${err}`);
                }else{

                    this.sprite.spriteFrame.setTexture(sp);
                }
            })
        });
    },

    // update (dt) {},
});
