import React from 'react'

import './home.less'
import { Link } from 'react-router-dom'
import useFrequency from 'hooks/audio/use-frequency'

export interface HomeProps {}
function Home(props: HomeProps) {
    const { play, stop } = useFrequency({ voiceValue: 0.3 })

    function onHoverMenu() {
        play()
    }

    // 怎么预加载下一页的资源？
    return (
        <section className='home'>
            <header className='header'>
                <h1 className='title'>For Gold</h1>
            </header>

            <main className='menu'>
                <Link to='/prepare' className='menu-item' onMouseEnter={onHoverMenu}>
                    新游戏
                </Link>
                <Link to='/continue' className='menu-item' onMouseEnter={onHoverMenu}>
                    继续
                </Link>
                <Link to='/setting' className='menu-item' onMouseEnter={onHoverMenu}>
                    设置
                </Link>
                {/* <Link to="/prepare" className="menu-item">新游戏</Link> */}
            </main>

            <footer className='footer'>
                <div className='version pr20'>version 0.1.0</div>
            </footer>
        </section>
    )
}

export default Home
