
module.exports = {

    /**
     * fix：未注明类型，待补全
     * 
     * 返回一个存储障碍物属性的对象
     * @param {*} speed 移动速度
     * @param {*} amplitude 振幅，仅对ufo有效
     * @param {*} angularVelocity 角速度，仅对ufo有效
     * @param {*} phase 初相，仅对ufo有效
     */
    moveLogicParam (speed = 1000, amplitude = 100, angularVelocity = 0.001, phase = 0){

        return {
            speed,
            amplitude,
            angularVelocity,
            phase,
        }
    }
}