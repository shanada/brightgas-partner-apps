import { cd } from "../components/common/colorData"

export function avatarUrl(name) {
    // let colors = ['#B27687', '#FFD46D', '#FF0449', '#18A1CC', '#FF8048', '#20B240', '#6764B2']
    // let color = colors[Math.floor(Math.random() * colors.length)].slice(1)
    let avatar = 'https://ui-avatars.com/api/?name=' + name + '&size=192&background=18A1CC&color=fff&bold=true'
    return avatar
}