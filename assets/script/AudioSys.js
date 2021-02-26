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
        this.audioType = {};
        this.loadList = [
            'battery',
            'burning',
            'button',
            'button2',
            'explore',
            'ufo',
            'background',
        ];

        cc.assetManager.loadBundle('audio', (err, bundle) =>{
            
            if (err) throw err;
            else {
                this.bundle = bundle;

                this.loadList.forEach(audioName =>{
                    
                    bundle.load(audioName, cc.AudioClip, (err, audio) =>{

                        console.log(`in ${audioName} and err ${err}`);
                        if (err){
                            this.audioType[audioName] = undefined;
                            console.log('err: '+ err);
                        }else{
                            this.audioType[audioName] = audio;

                            if (audioName === 'background'){
                                this.playBGM();
                            }
                        }
                    });
                });

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
            });
        }
        return this;
    },

    playBGM (){

        if (this.audioType.background){
            this.BGM = cc.audioEngine.playMusic(this.audioType.background, true);
        }else{

            this.bundle.load('background', cc.AudioClip, (err, audio) =>{

                if (err){
                    console.log(`err when load background + ${err}`);
                }else{

                    this.audioType.background = audio;
                    this.BGM = cc.audioEngine.playMusic(audio, true);
                }
            })
        }
        return this;
    },

    stopBGM (){
        cc.audioEngine.stop(this.BGM);
        return this;
    },

    restarBGM (){
        this.stopBGM().playBGM();
        return this;
    },
});
