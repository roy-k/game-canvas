import { LoadImg } from "type"

/** 人物当前状态 */
enum StatusEnum {
    'stand',
    'move',
    'run',
    'jump_up',
    'jump_down',
    'attack',
    'get_hit',
    'squat',
    'skill_1_static',
    'skill_1_move',
    'skill_2_static',
    'skill_2_move',
}
type Status = keyof typeof StatusEnum
/** 人物配置 */
type PersonConfig = {
    /** 生命值 */
    healthy: number
    /** 能量值 */
    energy: number
    /** 攻击力 */
    damage: number
    /** 防御力 */
    guard: number
    /** 跳跃力 */
    bounce: number
    /** 速度 */
    speed: number
}
/** 人物实时状态 */
type PersonState = {
    /** 更新时间 */
    time: number
    /** 状态 */
    status: Status
    /** 位置 */
    x: number
    y: number
    /** 速度 */
    vx: number
    vy: number
}
type PersonProps = {
    config: PersonConfig
    state: PersonState
    /** 加载图片 */
    loadImg: LoadImg
    /** 声音 */
}
/**
 * * ------ 人物基类 --------
 * @ 属性
 * 类的属性
 * 1. 基础配置: 人物属性
 * 2. 基础配置: 动作文件
 * 3. 基础配置:
 *
 * 状态属性
 * 1. 位置状态
 * 2. 变化趋势, 当前模式
 * 3. 周期性的作用, 如被动技能
 * * 特殊1 攻击时能不能移动, 借鉴dnf 有打断攻击的技能
 *
 * @ 方法
 * 设置属性
 * 1. 设置人物属性
 * 2. 关联基础配置
 * 3.
 *
 * 更新属性
 * 1. 更新人物属性
 * 2. 更新人物状态
 * 2.1 更新人物位置
 * 2.2 更新人物数据
 *
 * @ 事件处理
 * 事件类型识别分发
 * 1. 攻击
 * 2. 移动
 * 3. 跳跃等
 * 4. 受击
 */
export class PersonBase {
    protected config: PersonConfig
    protected state: PersonState
    readonly loadImg: LoadImg
    constructor(props: PersonProps) {
        const { config, state, loadImg } = props
        this.config = config
        this.state = state
        this.loadImg = loadImg
    }

    /**
     * 更新基础配置,
     * 主要用在作用于人物基础属性的功能上
     * eg. 增加攻击力, 回复等
     */
    public updateConfig(newConfig: PersonConfig) {
        Object.assign(this.config, newConfig)
    }

    /**
     * 更新状态, 主要用于实时渲染
     * 集合了位置计算的逻辑, 所以移动时会有相应状态设置
     */
    public updateState(newState: Partial<PersonState>) {
        Object.assign(this.state, newState)
    }

    /** 暴露出更新状态的接口, 方便调用 */
    public updateStatus(status: Status) {
        this.updateState({status})
    }

    /**
     * 当前计算位置
     * 参数:
     * 1. 时间
     * 2. 场景参数
     * 3. 人物状态
     * 4. 加速度
     * 主要是速度与时间的计算, 另外动作后续也有影响
     */
    private calcPosition(currentTime: number) {

    }

    // 事件设计
}
