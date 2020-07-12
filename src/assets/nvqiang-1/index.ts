// 站立 1 - 10
// 移动 69 - 76
// 跑动 77 - 82
// 跳跃上 95 - 96
// 跳跃下 97 - 98
// 攻击 22 - 32
// 被击90 - 94
// 下蹲 99

// 技能
// 移动射击 移动 120 -137
// 移动射击 静止 138 - 140
// buff 11- 21
type ImgSet = {
    [props: string]: [number, number] // key 需要约束一下
}
const imgUrlHead = ''
// todo 需要pad 0
export const nvqiang_1_imgSet = {
    stand: [1, 10],
    move: [69, 76],
    run: [77, 82],
    jump_up: [95, 96],
    jump_down: [97, 98],
    attack: [22, 32],
    get_hit: [90, 94],
    squat: [99, 99],

    // 涉及到空中释放技能， 怎么安排ui
    skill_1_static: [138, 140],
    skill_1_move: [120, 137],
    skill_2_static: [11, 21],
}
