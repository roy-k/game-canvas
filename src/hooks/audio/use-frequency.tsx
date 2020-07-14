import React, { useState, useEffect, useRef } from 'react'

const arrFrequency = [
    196.0,
    220.0,
    246.94,
    261.63,
    293.66,
    329.63,
    349.23,
    392.0,
    440.0,
    493.88,
    523.25,
    587.33,
    659.25,
    698.46,
    783.99,
    880.0,
    987.77,
    1046.5,
]
type PlayParams = {
    lastTime: number
    autoStop: boolean
}
const defaultPlayParams: PlayParams = {
    lastTime: 0.5,
    autoStop: true,
}
const initState = {
    currentIndex: 0,
    direction: 1,
}
export interface useFrequencyProps {
    /**音量 [0 - 1] */
    voiceValue?: number
}
const audioCtx = new AudioContext()

function useFrequency(props: useFrequencyProps) {
    const [state, setState] = useState(initState)
    const [playing, setPlaying] = useState(false)

    const osIns = useRef({ audioCtx })

    function play(params?: Partial<PlayParams>) {
        const { lastTime, autoStop } = Object.assign({}, defaultPlayParams, params)
        const { currentIndex, direction } = state
        const { audioCtx } = osIns.current

        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        const oscillator = audioCtx.createOscillator()
        // 创建一个GainNode,它可以控制音频的总音量
        const gainNode = audioCtx.createGain()

        oscillator.connect(gainNode)
        // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(audioCtx.destination)
        // 指定音调的类型，其他还有square|triangle|sawtooth
        oscillator.type = 'sine'

        if (playing) {
            console.log('playing')
            oscillator.stop()
            setPlaying(false)
        }

        if (currentIndex >= arrFrequency.length) {
            setState({
                currentIndex: arrFrequency.length - 1,
                direction: -1 * direction,
            })
        }

        // 当前频率
        const frequency = arrFrequency[currentIndex]
        oscillator.frequency.value = frequency
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        // 0.01秒后音量为1
        const maxVoiceValue = props.voiceValue || 1
        gainNode.gain.linearRampToValueAtTime(maxVoiceValue, audioCtx.currentTime + 0.01)

        setPlaying(true)
        // 音调从当前时间开始播放
        oscillator.start(audioCtx.currentTime)

        if (autoStop) {
            // 1秒内声音慢慢降低，是个不错的停止声音的方法
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + lastTime)
            // 1秒后完全停止声音
            oscillator.stop(audioCtx.currentTime + lastTime)
            setPlaying(false)
        }
    }

    // todo 怎么设计停止
    function stop(lastTime: number = 0.5) {
        // const { audioCtx, oscillator } = ins
        // oscillator.stop(audioCtx.currentTime + lastTime)
    }

    return { play, stop }
}

export default useFrequency
