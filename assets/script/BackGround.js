
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.ground = this.node.childrenCount >0 ? this.node.children[0] : null;
        this.reSetBackGround();
 
        this.itemList = [
            'birdItem',
            'cloundItem',
        ];

        this.bundle = cc.assetManager.getBundle('preform');
        if (this.bundle)
            return;
        cc.assetManager.loadBundle('preform', (err, bundle) =>{

            if (err) {
                console.log('err when load bundle in background');
                return ;
            }
            this.bundle = bundle;
        });
   },

    // update (dt) {},
    /**
     * 重置背景至最初状态
     */
    reSetBackGround (){
        this.endAni();
        this.inGame = false;
        this.nothing = true;
    },

    /**
     * 使背景进入游戏状态
     */
    intoGame(){
        this.startAni();
        this.inGame = true;
    },

    /**
     * 播放开始的缓动动画
     * 将背景移动到游戏中的位置(屏幕外)。
     */
    startAni (){

        cc.tween(this.ground)
            .to(1, {y: -1700}, {easing: t=> t*t})
            .start();
    },

    /**
     * 播放结束的缓动动画
     * 将背景移动到开始位置。
     */
    endAni () {

        cc.tween(this.ground)
            .delay(3)
            .to(1, {y: -900}, {easing: t => Math.sqrt(t)})
            .start();
    },

    update (dt){

        if (this.inGame && this.nothing){
            let code = Math.random();
            if (code < 0.006){
                return ;
            }

            this.nothing = false;
            // 创建背景运动物体
            let whichItem = Math.floor( Math.random() * 100) % this.itemList.length;
            this.bundle.load(`Item/${this.itemList[whichItem]}`, cc.Prefab, (err, preform) =>{

                if (err){
                    console.log(`err where load the ${this.itemList[whichItem].inGame } err: ${err}`);
                    return;
                }
                const creItem = cc.instantiate(preform);
                creItem.parent = this.node;
            });

            cc.tween(this)
                .to(8, {})
                .call(()=>{
                    this.nothing = true;
                })
                .start();
        }
    },
});
