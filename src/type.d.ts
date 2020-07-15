export type ImgSet = {
    [props: string]: HTMLImageElement[] // key 需要约束一下
}
export type LoadImg = () => Promise<ImgSet>