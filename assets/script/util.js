
module.exports = {

    /**
     * fix：未注明类型，待补全
     * 
     * 返回一个存储障碍物属性的对象
     * @param {cc.Vec2} startPos 生成位置
     * @param {*} speed 移动速度
     * @param {*} amplitude 振幅，仅对ufo有效
     * @param {*} angularVelocity 角速度，仅对ufo有效
     * @param {*} phase 初相，仅对ufo有效
     */
    moveLogicParam ({startPos =cc.v2(-500, 500) ,speed = 550, amplitude = 1000, angularVelocity = 0.0001, phase = 0}){

        return {
            startPos,
            speed,
            amplitude,
            angularVelocity,
            phase,
        }
    },
}