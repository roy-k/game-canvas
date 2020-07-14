/**
 * 由区间构造数组
 * (1) => [1]
 * (1, 3) => [1, 2, 3]
 */
// todo 函数式的思维话, format 位置可能考虑柯里化
// todo format 类型推导, 参考下react 的子组件提取和useCallback等
export type ArrRangeFormat<T = any> = (num: number) => T
export function arrRange(first: number, last?: number, format?: ArrRangeFormat) {
    if (!last || first === last) {
        return format ? [format(first)] : [first]
    }
    if (last <= first) {
        throw new Error('last must bigger then first')
    }
    return Array(last - first + 1)
        .fill(1)
        .map((_, i) => (format ? format(i + first) : i + first))
}

export function localArrRange(format: ArrRangeFormat) {
    return (first: number, last?: number) => arrRange(first, last, format)
}

/**
 * promise 加载图片
 */
export function loadImg(src: string) {
    return new Promise((resolve, reject) => {
        const pic = new Image()
        pic.src = src
        pic.onload = () => {
            resolve(pic)
        }
        pic.onerror = (error) => {
            console.log('error', src);
            reject(error)
        }
    }) as Promise<HTMLImageElement>
}
