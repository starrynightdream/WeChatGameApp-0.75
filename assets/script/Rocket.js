// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const PowerCore = require("PowerCore");
const Engine = require("Engine");
const ControlBar = require("ControlBar");
const BackGround = require("BackGround");

cc.Class({
    extends: cc.Component,

    properties: {
        // 步长
        step:{
            default: 10,
            type: cc.Integer,
            tooltip:"步长"
        },
        // 引擎
        engine:{
            default:null,
            type: Engine,
            tooltip:"引擎类"
        },
        // 能量槽
        powerCore:{
            default:null,
            type: PowerCore,
            tooltip:"能量槽类"
        },
        // 控制版面
        controlBar:{
            default:null,
            type:ControlBar,
            tooltip:"控制滑动板"
        },
        backGround:{
            default: null,
            type: BackGround,
            tooltip: "用于反映高度和时间的背景" ,
        },

        gameControlNode:{
            default: null,
            type: cc.Node,
            tooltip:"游戏控制器的节点"
        },

        k:{
            default:1,
            type:cc.Float,
            tooltip:"滑动的接收灵敏度，最好介于0-1",
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        this.gameControl = this.gameControlNode.getComponent("GameControl");

        this.angle = Math.PI /2;
        this.reSetRocket();
    },

    update (dt) {
        if (!this.inGame){
            return
        }
        // this.node.y += this.Vy() *dt *this.step
        this.node.x += this.Vx() *dt *this.step

        // 计算能耗
        let oil = this.engine.use(this.wast *dt)
        let overUse = this.powerCore.use(oil)

        if (!(overUse &&this.alive)){
            // 能量不足消耗
            this.death()
            this.gameControl.GameOver()
            this.active = false
        }

        // 反映污染
        if (oil !== 0 && !this.powerCore.isClear()){
            // 此处的污染速度值，定为5，应当通过电池或者设置更为合理的数字
            this.gameControl.pollute(5 * dt);
        }

        if (this.alive)
            this.angle -= (this.controlBar.bar.progress - 0.5) *0.05 * this.k;

        // 对应反映火箭状态
        this.node.angle = ((this.angle *180 /Math.PI) -90);

        // 推送消息
        this.controlBar.setEData(this.getEngE(), this.getE())
    },

    /**
    * 当碰撞产生的时候调用
    * @param  {Collider} other 产生碰撞的另一个碰撞组件
    * @param  {Collider} self  产生碰撞的自身的碰撞组件
    */
    onCollisionEnter (other, self){
        let Item = other.getComponent("Item");
        // 注入自身
        Item.getItem(this);
        // 注入游戏控制器
        Item.setGame(this.gameControl);
    },

    // 接口

    /**
     * 使火箭回到游戏最开始的时候 
     */
    reSetRocket (){
        this.engine.reSetEng();
        this.powerCore.reSetPC();
        this.controlBar.reSetConBar();

        this.speed = 20;
        this.alive = true;
        this.inGame = false;
    },

    /**
     * 调用后开始进入游戏状态
     */
    intoGame (){
        this.controlBar.reSetConBar();
        // 动画播放结束后进入游戏状态
        this.callAfterAni();
    },

    /**
     * 在动画结束的时候调用
     * 调用后进入开始状态
     */
    callAfterAni (){

        // 在火箭播放完动画后背景才开始进入动画
        this.backGround.intoGame();
        this.inGame = true;
    },

    /**
     * 速度
     */
    V (){
        return this.speed;
    },

    /**
     * 水平方向上的速度
     */
    Vx (){
        return this.speed *Math.cos(this.angle) *this.step
    },

    /**
     * 竖直方向的速度
     */
    Vy (){
        return this.speed *Math.sin(this.angle) *this.step
    },

    /**
     * 变更速度
     * @param {*} v 变更后的速度
     */
    setV (v) {
        this.speed = v
    },
    
    /**
     * 设置火箭结束活动
     */
    death () {
        // 届时需平滑过渡
        this.alive = false
        this.speed = 0
        this.node.x = 0
        this.angle = Math.PI /2

        this.backGround.reSetBackGround();
    },

    /**
     * 变更发动机类型
     * @param {Number} type 发动机的代号
     * @param {Float} E 发动机中的能量
     */
    setEng (type, E){
        this.engine.changeEng(type, E)
    },

    /**
     * 设置损耗
     * @param {Number} wast 损耗
     */
    setWast (wast = 0){
        this.wast = wast;
    },

    /**
     * 添加能量
     * @param {*} type 能量是否清洁
     * @param {*} E 能量大小
     */
    addE (type, E) {
        this.powerCore.addE(type, E, E)
    },
    /**
     * 返回当前能量槽
     */
    getE(){
        return this.powerCore.readPC()
    },

    /**
     * 获取发动机类型
     */
    getEngType(){
        return this.engine.type
    },

    /**
     * 获取发动机能量槽
     */
    getEngE(){
        return this.engine.E / this.engine.EMAX
    },

    /**
     * 通过拖动条变更方向
     * 弃用
     * @param {*} slider 拖动条
     */
    setAng(slider){
        // if (this.alive)
        //     this.angle -= (slider.progress - 0.5) *0.05;
    },
});
