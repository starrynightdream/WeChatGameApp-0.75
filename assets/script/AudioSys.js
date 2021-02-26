// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.loadList = [
            'background',
            'battery',
            'burning',
            'button',
            'button2',
            'explore',
        ];

        cc.assetManager.loadBundle('audio', (err, bundle) =>{
            
            if (err) throw err;
            else {
                this.bundle = bundle;

                this.loadList.forEach(name =>{
                    
                    bundle.load(name, cc.AudioClip, (err, audio) =>{
                        if (err){
                            this.audioType[name] = undefined;
                            console.log('err: '+ err);
                        }else{
                            this.audioType[name] = audio;
                        }
                    });
                });

                this.playBGM();
            }
        });

    },

    // update (dt) {},

    /**
     * 使用该接口播放音效
     * @param {string} name 音效名称
     * @param {Boolean} loop 是否循环，默认不
     */
    play (name, loop = false){
        
        if (this.audioType[name]){
            // 播放
            cc.audioEngine.playEffect(this.audioType[name], loop);
        }else{

            this.bundle.load(name, cc.AudioClip, (err, audio) =>{

                if (err){
                    console.log('err' + err);
                }else{
                    this.audioType[name] = audio;
                    //播放
                    cc.audioEngine.playEffect(this.audioType[name], loop);
                }
            })
        }
        return this;
    },

    playBGM (){

        this.BGM = cc.audioEngine.playMusic(this.audioType['background.mp3'], true);
        return this;
    }
});
