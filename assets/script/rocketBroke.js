
cc.Class({
    extends: cc.Component,

    properties: {
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start (){
        this.ani = this.getComponent(cc.Animation);
    },

    /**
     * 进入游戏
     */
    readyToPlay(){
        this.node.y = -700;
        this.node.opacity = 255;
        cc.tween(this.node)
            .to(0.5, {y :0})
            .start();

        return this;
    },

    /**
     * 开始播放动画
     */
    intoGame(){
        this.ani.play();

        return this;
    },
    /**
    * 火箭动画结束回调
    */
    rocketBroke(){
        const rocketBroke=this.node;
        cc.assetManager.loadBundle('preform', (err, bundle) => {

            if (err){
                console.log(err);
            }
            bundle.load("Rocket/spiteItem", cc.Prefab, function (err, prefab) {

                if (err){
                    console.log(err);
                }
                let spiteItem = cc.instantiate(prefab);
                rocketBroke.addChild(spiteItem);
            });

            bundle.load("Rocket/explodeItem", cc.Prefab, (err, prefab) =>{
                if (err){
                    console.log(err);
                }

                let exploreItem = cc.instantiate(prefab);
                rocketBroke.addChild(exploreItem);
            });
        });
    },

    /**
     * 火箭开始动画播放完毕的回调
     */
    rocketStarted(){
        const rocketBroke=this.node;

        cc.assetManager.loadBundle('preform', (err, bundle) => {

            if (err){
                console.log(err);
            }
            
            bundle.load('Rocket/rocketItem', cc.Prefab, (err, prefab)=> {
                if (err) console.log(`err when load start reocket err ${err}`);

                let rocketItem= cc.instantiate(prefab);
                rocketBroke.parent.addChild(rocketItem);
                
                rocketBroke.parent.getComponent('Rocket').callAfterAni(); 
                this.node.opacity = 0;
            });
        });
    }

});
