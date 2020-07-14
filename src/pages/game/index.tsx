import React, { useEffect } from 'react'

import {loadImages} from './assets/nvqiang-1'
export interface GameProps {}
function Game(props: GameProps) {
    useEffect(() => {
        loadImages().then((res) => {
            console.log('加载成功', res);
        }, (err) => {
            console.log(err);
        })
    }, [])
    return <div>game</div>
}

export default Game
