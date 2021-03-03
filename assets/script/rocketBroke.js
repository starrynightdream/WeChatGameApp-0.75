
cc.Class({
    extends: cc.Component,

    properties: {
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start (){
        this.ani = this.getComponent(cc.Animation);
    },

    // startRocke-----------------------
    /** 
      * 火箭开始动画播放完毕的回调 
      */ 
    rocketStarted(){ 
        this.node.opacity = 0;

        this.node.parent.getComponent('Rocket').callAfterAni();
        return this;
    },


    // rocketitem-----------------------

    /**
     * 当火箭死亡的时候
     */
    whenDeath (x, y, ang, parent){
        let pos = cc.v2(x, y);
        this.createBroke(pos, ang, parent);

        return this;
    },

    /**
     * 当进入游戏的时候
     */
    whenGame (){
        return this;
    },

    /**
     * 创建一个损坏火箭
     * @param {Node} toNode 创建一个node与之相等的物件
     */
    createBroke (pos, ang, par){
        
        const a = (err, bundle) =>{
            if (err){
                console.log(`err when createBroken load bundle ${err}`);
            }else{
                bundle.load('Rocket/rocketBroken', cc.Prefab, (err, preform) =>{
                    
                    if (err){
                        console.log(`err when createBroken load rocketBroke ${err}`);
                    }else{

                        const rocketB = cc.instantiate(preform);
                        rocketB.position = pos;
                        rocketB.angle = ang;
                        rocketB.scale = cc.v2(0.6, 0.6);
                        rocketB.parent = par;
                    }
                });
            }
        }

        this.bundle = cc.assetManager.getBundle('preform');
        if (this.bundle){
            a(null, this.bundle);
            return;
        }
        cc.assetManager.loadBundle('preform', a);
    },

    // rocketBroke----------------------

    /**
    * 火箭动画火箭消失前回调
    */
    rocketBroke(){
        const rocketBroke=this.node;
        const a = (err, bundle) =>{
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

            rocketBroke.parent.getComponent('Rocket').deathAftAni();
        }

        this.bundle = cc.assetManager.getBundle('preform');
        if (this.bundle){
            a(null, this.bundle);
            return ;
        }
        cc.assetManager.loadBundle('preform', a); 
    },
}); 