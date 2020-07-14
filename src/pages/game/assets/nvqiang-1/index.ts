/**
 * 女枪
 */
import { localArrRange, loadImg } from 'pages/game/utils/utils'

const formatFn = (num: number) => `${num}`.padStart(4, '0')

const r = localArrRange(formatFn)

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
export const imgArrMap = {
    stand: r(1, 10),
    move: r(69, 76),
    run: r(77, 82),
    jump_up: r(95, 96),
    jump_down: r(97, 98),
    attack: r(22, 32),
    get_hit: r(90, 94),
    squat: r(99),

    // 涉及到空中释放技能， 怎么安排ui
    skill_1_static: r(138, 140),
    skill_1_move: r(120, 137),
    skill_2_static: r(11, 21),

    // todo 默认动作集
}

type ImgSet = {
    [props: string]: HTMLImageElement[] // key 需要约束一下
}
export async function loadImages() {
    /** 组织所有图片 -> Image[] */
    const imgSet: ImgSet = {}

    await Promise.all(
        Object.entries(imgArrMap).map(([key, arr]) => {
            if (!imgSet[key]) {
                imgSet[key] = []
            }
            return Promise.all(
                arr.map(async (v, index) => {
                    const src = require(`./image/nvqiang-1_frame_${v}.png`)
                    const img = await loadImg(src)
                    imgSet[key][index] = img
                })
            )
        })
    )

    return imgSet
}
