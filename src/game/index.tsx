import React, { useEffect, useState } from 'react'

import bg1 from '../assets/bg1.png'
import role from '../assets/role.gif'

const bg = require('../assets/bg1.png')

const assets = [bg1, role]
const loadingAssets = assets.map((src) => {
    return new Promise((resolve, reject) => {
        const pic = new Image()
        pic.src = src
        pic.onload = () => {
            resolve(pic)
        }
        pic.onerror = (error) => {
            reject(error)
        }
    }) as Promise<HTMLImageElement>
})

export interface GameProps {}
function Game(props: GameProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all(loadingAssets).then(
            () => {
                setLoading(false)
            },
            (err) => {
                console.log('err', err)
            }
        )
    }, [])

    async function drawImg () {
        const canvas: HTMLCanvasElement | null = document.querySelector('#canvas1')
        const ctx = canvas!.getContext('2d')
        const cx = ctx!

        const bg = await loadingAssets[1]
        // const pic = new Image()
        // pic.src = bg1
        console.log('draw');

        cx.drawImage(bg, 0, 0)
        // requestAnimationFrame(drawImg)
    }


    useEffect(() => {
        if (loading) return
        requestAnimationFrame(drawImg)
        // drawImg()

    }, [loading])

    return (
        <div>
            <canvas id='canvas1' width='800' height='600'></canvas>
        </div>
    )
}

export default Game
