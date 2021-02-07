// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
/**
 * 能量槽类
 */

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.reSetPC()
    },

    // update (dt) {},

    /**
     * 初始化能量槽
     */
    reSetPC(){
        this.eList = [0,0,0,0,0]  // 能源槽
        this.eMaxList = [0,0,0,0,0]  //能源槽的最大值
        this.eClearList = [1,1,1,1,1]  //能源是否清洁
        this.index = 0 // 使用第几个能源槽
        this.count = 0 // 有几个能源槽非空
    },

    /**
     * 读取能量槽的数据
     * 返回值是能量槽的填充比例
     */
    readPC(){
        let ans = [0,0,0,0,0]
        for (let i=0;i<5; i++){
            let p = (i + this.index - this.count +6) %5
            if (this.eList[p] !=0){
                ans[i] = this.eList[p] / this.eMaxList[p]
            }
            ans[i] *= this.eClearList[p]
        }
        return ans
    },

    /**
     * 添加能源，如果能源槽满则会加分
     * @param {*} isClear 是否为清洁能源
     * @param {*} E 能源的多少
     * @param {*} EMAX 该能源槽的多少
     * @returns {boolean} 是否添加成功
     */
    addE(isClear, E, EMAX){

        if (this.count == 5){
            return false
        }
        let p = (this.index - this.count + 5) %5
        this.eList[p] = E
        this.eMaxList[p] = EMAX
        this.eClearList[p] = isClear?1:-1
        this.count +=1
        return true
    },

    /**
     * 使用能量
     * @param {*} wast 使用量
     * @returns {boolean} 是否足够消耗
     */
    use:function(wast){
        if (wast <=0.0001){
            return true
        }
        let i,dis
        while (this.count!=0){
            i = this.index
            dis = wast - this.eList[i]
            wast = Math.max(dis, 0)
            this.eList[i] = Math.max(-dis, 0)
            if (wast >0){
                this.count -=1
                this.index = (i + 4) %5
            }else{
                break
            }
        }
        return wast<=0
    }
});
