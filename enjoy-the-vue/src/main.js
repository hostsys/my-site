import { createApp } from 'vue'
// import { createRouterScroller } from 'vue-router-better-scroller';
import { nextTick } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'
import './assets/main.css'

import axios from 'axios'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(createRouterScroller({
//   selectors: {
//     'body': true,
//     '#content': true
//   },
// }))

app.mount('#app')

// BACKGROUND SCENE START

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// scene
const bgScene = new THREE.Scene()

// shape

const bgGeometry = new THREE.BufferGeometry()
const positions = []

for (let i = 0; i < 6000; i++) {
    const particle = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 2000 - 1000,
        Math.random() * 600 - 300
    )

    // particle.velocity = 0;
    // particle.acceleration = 0.02;

    positions.push(particle.x, particle.y, particle.z)

    // bgGeometry.vertices.push(particles);
    bgGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
}

// bgScene.background = new THREE.Color(0x010101)

const bgTexture = new THREE.TextureLoader().load('star-texture.png')
const bgMaterial = new THREE.PointsMaterial({
    color: 'white',
    size: 2,
    map: bgTexture,
    transparent: true,
    blending: THREE.AdditiveBlending
})
console.log(bgMaterial)
const stars = new THREE.Points(bgGeometry, bgMaterial)
bgScene.add(stars)

const bgCamera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.01, 2000)
bgCamera.position.z = 1
bgCamera.rotation.x = Math.PI / 2

bgScene.add(bgCamera)

// renderererer
const canvas = document.querySelector('#bg')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.render(bgScene, bgCamera)

// resize
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // tell the camera
    bgCamera.aspect = sizes.width / sizes.height
    bgCamera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

// rotation q and e

let yRotation = 0

window.addEventListener('keydown', (downEvent) => {
    //case of q
    if (downEvent.key.toLowerCase() === 'a') {
        tweenYRotation(-0.03)
    } //case of e
    else if (downEvent.key.toLowerCase() === 'd') {
        tweenYRotation(0.03)
    }
})
// release
window.addEventListener('keyup', (upEvent) => {
    //case of q
    if (upEvent.key.toLowerCase() === 'a' || upEvent.key.toLowerCase() === 'd') {
        tweenYRotation(0)
    }
})

// speed w and s

let ySpeed = 1
let speedChangeInProgress = false

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 's' && !speedChangeInProgress) {
        tweenYSpeed(0.3, 800, TWEEN.Easing.Sinusoidal.In)
    } else if (event.key.toLowerCase() === 'w' && !speedChangeInProgress) {
        tweenYSpeed(3, 800, TWEEN.Easing.Quartic.In)
    }
})

document.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'w') {
        tweenYSpeed(1, 800, TWEEN.Easing.Sinusoidal.InOut)
    }
})

function tweenYSpeed(targetSpeed, duration, easing) {
    speedChangeInProgress = true // Mark speed change animation in progress

    new TWEEN.Tween({ speed: ySpeed })
        .to({ speed: targetSpeed }, duration) // Transition time in milliseconds
        .easing(easing) // Use specified easing function
        .onUpdate((obj) => {
            ySpeed = obj.speed
        })
        .onComplete(() => {
            speedChangeInProgress = false // Reset the flag after animation completion
        })
        .start()
}

function tweenYRotation(targetRSpeed) {
    new TWEEN.Tween({ rSpeed: yRotation })
        .to({ rSpeed: targetRSpeed }, 1200) // Transition time in milliseconds
        .easing(TWEEN.Easing.Sinusoidal.InOut) // Use desired easing function
        .onUpdate((obj) => {
            yRotation = obj.rSpeed
        })
        .start()
}

// rerenderer

function bgAnimate() {
    TWEEN.update()
    // console.log( ySpeed )
    const positions = bgGeometry.getAttribute('position').array

    for (let i = 0; i < positions.length; i += 3) {
        // let x = positions[i];
        let y = positions[i + 1]
        // let z = positions[i + 2];

        // y -= 1;
        y -= ySpeed

        if (y < -1000) {
            y = 1000
        }

        positions[i + 1] = y // update the modified y-coordinate
    }
    // star rotation controls
    stars.rotation.y += yRotation

    bgGeometry.getAttribute('position').needsUpdate = true
    renderer.render(bgScene, bgCamera)
    window.requestAnimationFrame(bgAnimate)
}
bgAnimate()

// BACKGROUND SCENE END, MENU SCENE BEGIN

// sizes
const eyeSizes = {
    width: 150,
    height: 150
}

// scene
const eyeScene = new THREE.Scene()

// shape
const eyeShape = new THREE.IcosahedronGeometry(2, 0, 0)
const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 'white'
})
const eyeMesh = new THREE.Mesh(eyeShape, eyeMaterial)

const eyeOrigin = new THREE.Vector3(0, 0, 0)
eyeMesh.position.x = 0
eyeMesh.position.z = 0
eyeMesh.lookAt(eyeOrigin)

eyeScene.add(eyeMesh)

// camera
// const eyeCamera = new THREE.PerspectiveCamera(
//   30,
//   eyeSizes.width / eyeSizes.height,
//   0.1,
//   100
// );
const eyeCamera = new THREE.OrthographicCamera(
    eyeSizes.width / -75, // Left (adjust this value)
    eyeSizes.width / 75, // Right (adjust this value)
    eyeSizes.height / 75, // Top (adjust this value)
    eyeSizes.height / -75 // Bottom (adjust this value)
)

eyeCamera.position.z = 10
eyeScene.add(eyeCamera)

// light
const eyeLight = new THREE.PointLight(0xffffff, 0.5)
eyeLight.position.set(0, 0, 10)

eyeScene.add(eyeLight)

// mouse move anim

window.addEventListener('mousemove', onmousemove, false)

const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const intersectPoint = new THREE.Vector3()

function onmousemove(event) {
    setTimeout(function () {
        // const startRotation = eyeMesh.quaternion.clone();

        mouse.x = (event.clientX / sizes.width) * 75 - 37.5
        mouse.y = -(event.clientY / sizes.height) * 75 + -10
        raycaster.setFromCamera(mouse, eyeCamera)
        raycaster.ray.intersectPlane(plane, intersectPoint)
        intersectPoint.z = 100 // so that the object is still always facing the camera which has a position.z of 100 too
        // eyeMesh.lookAt(intersectPoint);

        // backup original rotation
        var startRotation = new THREE.Euler().copy(eyeMesh.rotation)

        // final rotation (with lookAt)
        eyeMesh.lookAt(intersectPoint)
        var endRotation = new THREE.Euler().copy(eyeMesh.rotation)

        // revert to original rotation
        eyeMesh.rotation.copy(startRotation)

        const eyeTween = new TWEEN.Tween(eyeMesh.rotation)
            .to({ x: endRotation.x, y: endRotation.y, z: endRotation.z }, 150)
            .easing(TWEEN.Easing.Quadratic.Out)
        eyeTween.start()
    }, 150)
}

// color change on hover
// get header child elements
const header = document.getElementById('header').children

// loop through header children
for (let i = 0; i < header.length; i++) {
    const parent = header[i]
    // loop through header children's children
    for (let j = 0; j < parent.children.length; j++) {
        const child = parent.children[j]
        // mouseover event
        child.addEventListener('mouseover', function () {
            const itemID = this.id
            // color cases
            switch (itemID) {
                case 'home':
                    eyeMaterial.color.set('purple')
                    break

                case 'portfolio':
                    eyeMaterial.color.set('blue')
                    break

                case 'music':
                    eyeMaterial.color.set('yellow')
                    break

                case 'gallery':
                    eyeMaterial.color.set('green')
                    break

                default:
                    eyeMaterial.color.set('white')
            }
        })
        // mouseout event, default color
        child.addEventListener('mouseout', function () {
            // const itemID = this.id;
            eyeMaterial.color.set('white')
        })
    }
}

// change color theme
const root = document.documentElement
let currentThemeIndex = 0

function changeTheme(themeName) {
    const theme = colorThemes[themeName]
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-secondary', theme.secondary)
    root.style.setProperty('--color-tertiary', theme.tertiary)
    root.style.setProperty('--color-scene', theme.sceneRgb)

    bgScene.background = new THREE.Color(...theme.scene)
    bgMaterial.color.set(...theme.stars)
    updateVolumeButtonColors()
}

const colorThemes = {
    defaultTheme: {
        primary: '255 255 255',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0xffffff]
    },
    redTheme: {
        primary: '220 50 75',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0xff8c8c]
    },
    orangeTheme: {
        primary: '220 120 85',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0xff9b4f]
    },
    yellowTheme: {
        primary: '220 220 100',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0xdcdc0f]
    },
    greenTheme: {
        primary: '100 220 100',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0x0fdc0f]
    },
    blueTheme: {
        primary: '100 100 220',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0x6464dc]
    },
    indigoTheme: {
        primary: '220 100 220',
        secondary: '0 0 0',
        tertiary: '100 100 100',
        scene: [0x020202],
        sceneRgb: '0 0 0',
        stars: [0xdc64dc]
    }
}

const themes = Object.keys(colorThemes)
let gayMode = false
let rainbowInterval

changeTheme('defaultTheme')

window.addEventListener('keydown', (downEvent) => {
    if (downEvent.key.toLowerCase() === 'q') {
        currentThemeIndex = Math.max(currentThemeIndex - 1, 0)
        const prevTheme = themes[currentThemeIndex]
        changeTheme(prevTheme)
    } else if (downEvent.key.toLowerCase() === 'e') {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length
        const nextTheme = themes[currentThemeIndex]
        changeTheme(nextTheme)
    } else if (downEvent.key.toLowerCase() === 'r') {
        if (gayMode) {
            clearInterval(rainbowInterval)
            gayMode = false
        } else {
            rainbowInterval = setInterval(() => {
                currentThemeIndex = (currentThemeIndex + 1) % themes.length
                let nextTheme = themes[currentThemeIndex]
                if (nextTheme === 'defaultTheme') {
                    currentThemeIndex = (currentThemeIndex + 1) % themes.length
                    nextTheme = themes[currentThemeIndex]
                    changeTheme(nextTheme)
                } else {
                    changeTheme(nextTheme)
                }
            }, 250)
            gayMode = true
        }
    }
})

// renderererer
const eyeBox = document.querySelector('#eyebox')
const eyeRenderer = new THREE.WebGLRenderer({ canvas: eyeBox, alpha: true })

eyeRenderer.setSize(eyeSizes.width, eyeSizes.height)
eyeRenderer.render(eyeScene, eyeCamera)

// anims
const eyeLoop = (t) => {
    TWEEN.update(t)
    //eyeMesh.rotation.x -= 0.01;
    eyeRenderer.render(eyeScene, eyeCamera)
    window.requestAnimationFrame(eyeLoop)
}

eyeLoop()

// sfx

class Sfx {
    constructor(source, volume = 0.1, loop = false) {
        this.audio = new Audio(source)
        this.audio.volume = volume
        this.audio.loop = loop
    }

    play() {
        this.audio.play()
    }

    cloneAndPlay() {
        const clonedAudio = new Sfx(this.audio.src, this.audio.volume, this.audio.loop)
        clonedAudio.play()
    }
}

const clickSfx = new Sfx(
    'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/bonus.wav'
)
const enterSfx = new Sfx(
    'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatpellet.ogg'
)
const navSfx = new Sfx(
    'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav'
)

const sfxElements = Array.from(document.querySelectorAll('a, #enterBtn, button'))

for (let sfxElement of sfxElements) {
    if (sfxElement.id === 'enterBtn') {
        sfxElement.addEventListener('click', () => {
            playPauseSong()
            clickSfx.cloneAndPlay()
        })
    } else {
        if (sfxElement.parentElement.id === 'navigation') {
            sfxElement.addEventListener('click', () => navSfx.cloneAndPlay())
        } else {
            sfxElement.addEventListener('mouseenter', () => enterSfx.cloneAndPlay())
            sfxElement.addEventListener('click', () => clickSfx.cloneAndPlay())
        }
    }
}

// music player

class Song {
    constructor(id, title, coverArt, musicFile, releaseDate, spotifyLink, oneLiner) {
        this.id = id
        this.title = title
        this.coverArt = coverArt
        this.musicFile = new Audio(musicFile)
        this.releaseDate = releaseDate
        this.spotifyLink = spotifyLink
        this.oneLiner = oneLiner
        this.isPlaying = false
    }

    play() {
        this.musicFile.play()
        this.isPlaying = true
    }

    pause() {
        this.musicFile.pause()
        this.isPlaying = false
    }

    toggle() {
        if (this.isPlaying) {
            this.pause()
        } else {
            this.play()
        }
    }
}

let songs = []
const firstSongTitle = 'profession of abuse'

const getMusic = async () => {
    try {
        const response = await axios.get('https://uriah.website/wp-json/hs/v1/musics')
        const musicData = response.data

        songs = musicData.map(
            (songData) =>
                new Song(
                    songData.id,
                    songData.title,
                    songData.cover_art,
                    songData.music_file,
                    songData.release_date,
                    songData.spotify_link,
                    songData.one_liner
                )
        )
        const firstSongIndex = songs.findIndex((song) => song.title === firstSongTitle)

        if (firstSongIndex !== -1) {
            const [desiredSong] = songs.splice(firstSongIndex, 1)
            songs.unshift(desiredSong)
        }

        console.log(songs)
        loadSong()
    } catch (err) {
        console.log(err)
    }
}
getMusic()
// setInterval(getMusic, 5000);

let currentSongIndex = 0
let currentSong = songs[currentSongIndex]
let currentVolume = Math.pow(0.5, 1.5)
let isDragging = false

const playBtn = document.getElementById('play-pause')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')

const progressBar = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

const playIcon = document.querySelector('.play-icon')
const pauseIcon = document.querySelector('.pause-icon')

playBtn.onclick = playPauseSong
prevBtn.onclick = prevSong
nextBtn.onclick = nextSong

progressContainer.addEventListener('mousedown', startDragging)
progressContainer.addEventListener('mousemove', updateDragging)
progressContainer.addEventListener('mouseup', endDragging)

const volumeButtons = document.querySelectorAll('.vol-btn')

volumeButtons.forEach((item) => {
    item.addEventListener('click', () => {
        const button = item.id
        const btnTexts = document.querySelectorAll('.vol-btn p')

        // Remove styles from all p elements
        btnTexts.forEach((p) => {
            p.classList.remove('underline')
        })

        item.querySelector('p').classList.add(
            'underline',
            'decoration-4',
            'decoration-dotted',
            'decoration-secondary',
            'underline-offset-2'
        )

        navSfx.cloneAndPlay()

        switch (button) {
            case '0':
                currentSong.musicFile.volume = 0
                break
            case '25':
                currentSong.musicFile.volume = Math.pow(0.25, 1.5)
                break
            case '50':
                currentSong.musicFile.volume = Math.pow(0.5, 1.5)
                break
            case '75':
                currentSong.musicFile.volume = Math.pow(0.75, 1.5)
                break
            case '100':
                currentSong.musicFile.volume = 1
                break
        }
    })
})

function interpolateColor(color2, color1, percentage) {
    const [r1, g1, b1] = color1.split(' ').map(Number)
    const [r2, g2, b2] = color2.split(' ').map(Number)

    const r = Math.round(r1 + (r2 - r1) * (percentage / 100))
    const g = Math.round(g1 + (g2 - g1) * (percentage / 100))
    const b = Math.round(b1 + (b2 - b1) * (percentage / 100))

    return `rgb(${r} ${g} ${b})`
}

// Function to update the background colors of the volume buttons
function updateVolumeButtonColors() {
    // Get the primary and secondary colors from your CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue(
        '--color-primary'
    )
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue(
        '--color-secondary'
    )

    // Set the background color for each volume button based on the percentage
    document.querySelectorAll('.vol-btn').forEach((button, index) => {
        const percentage = index * 17.5 + 30 // Adjust this for your desired steps
        console.log(percentage)
        const backgroundColor = interpolateColor(primaryColor, secondaryColor, percentage)
        button.style.backgroundColor = backgroundColor
    })
}

// Call the function initially
updateVolumeButtonColors()

function updateProgress() {
    const { currentTime, duration } = currentSong.musicFile
    const progressPercent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPercent}%`

    if (progressPercent === 100) {
        setTimeout(nextSong(), 250)
    }
}

function startDragging(e) {
    isDragging = true
    currentSong = songs[currentSongIndex]
    currentSong.pause()

    playIcon.classList.remove('hidden')
    pauseIcon.classList.add('hidden')

    updateDragging(e)
}

function updateDragging(e) {
    if (!isDragging) return

    const width = progressContainer.clientWidth
    const clickX = e.offsetX
    const duration = currentSong.musicFile.duration

    currentSong.musicFile.currentTime = (clickX / width) * duration
}

function endDragging() {
    isDragging = false
    playPauseSong()
}

// window.addEventListener('keydown', (downEvent) => {
//   if ( downEvent.key === ' ' ) {
//     playPauseSong();
//   }
// });

function playPauseSong() {
    currentSong = songs[currentSongIndex]
    if (currentSong.isPlaying) {
        currentSong.pause()
        playIcon.classList.remove('hidden')
        pauseIcon.classList.add('hidden')
    } else {
        currentSong.play()
        playIcon.classList.add('hidden')
        pauseIcon.classList.remove('hidden')
    }
}

function nextSong() {
    currentSong.musicFile.removeEventListener('timeupdate', updateProgress)
    currentSong.pause()
    currentSongIndex = (currentSongIndex + 1) % songs.length
    loadSong()
    currentSong.musicFile.currentTime = 0
    playPauseSong()
}

function prevSong() {
    currentSong.musicFile.removeEventListener('timeupdate', updateProgress)
    currentSong.pause()
    currentSongIndex = Math.max(currentSongIndex - 1, 0)
    loadSong()
    currentSong.musicFile.currentTime = 0
    playPauseSong()
}

function loadSong() {
    currentSong = songs[currentSongIndex]
    currentSong.musicFile.addEventListener('timeupdate', updateProgress)
    currentSong.musicFile.volume = currentVolume
    const titleElement = document.getElementById('title')
    const coverElements = document.querySelectorAll('#cover, #cover-tooltip')

    titleElement.innerHTML = currentSong.title
    coverElements.forEach((e) => {
        e.src = currentSong.coverArt
    })
}

// percent scroll

document.addEventListener('DOMContentLoaded', function () {
    let content = document.getElementById('content')

    const percent = document.getElementById('percent')
    percent.style.opacity = '0'

    let maxScrollDistance = content.scrollHeight - content.clientHeight

    window.addEventListener('load', () => {
        maxScrollDistance = content.scrollHeight - content.clientHeight
        showOrHideScroll()
    })

    window.onresize = function () {
        maxScrollDistance = content.scrollHeight - content.clientHeight
        showOrHideScroll()
    }

    router.afterEach(() => {
        percent.classList.remove('transition-opacity')
        percent.style.opacity = '0'
        nextTick(() => {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        window.requestAnimationFrame(() => {
                            setTimeout(() => {
                                showOrHideScroll()
                            }, 100)
                        })
                    })
                })
            })
        })
    })

    function showOrHideScroll() {
        maxScrollDistance = content.scrollHeight - content.clientHeight
        if (maxScrollDistance === 0) {
            percent.classList.remove('transition-opacity')
            percent.style.opacity = '0'
        } else {
            setTimeout(() => {
                percent.classList.add('transition-opacity')
                percent.style.opacity = '0.4'
            }, 150)
            percent.innerHTML = 'scroll'
            scrollBoxContent()
        }
    }

    // defining what should be painted in the scroll box
    function scrollBoxContent() {
        let scrollDistance = content.scrollTop
        let progress = (scrollDistance / maxScrollDistance) * 100
        progress = Math.max(0, Math.min(100, progress))
        percent.innerHTML = Math.round(progress) + '%'
        // console.log(Math.round(progress));

        switch (Math.round(progress)) {
            case 0:
                percent.innerHTML = 'scroll'
                break
            case 99:
                percent.innerHTML = 'no more'
                break
            case 100:
                percent.innerHTML = 'no more'
                break
            default:
                setTimeout(() => {
                    percent.classList.add('transition-opacity')
                    percent.style.opacity = '0.4'
                }, 150)
            // percent.style.setProperty('--color-secondary', sceneColor)
        }
    }

    content.onscroll = scrollBoxContent

    // start button
    const enterBtn = document.getElementById('enterBtn')
    const enterBtnBox = document.getElementById('enterBtnBox')
    const body = document.getElementById('contentBody')

    // enterBtn.addEventListener('click', () => {
    //     body.style.opacity = '1'
    //     // enterBtn.style.opacity = 'none';
    //     enterBtnBox.style.opacity = '0'
    //     enterBtnBox.style.zIndex = '-3'
    //     showOrHideScroll()
    // })

    body.style.opacity = '1'
    // enterBtn.style.opacity = 'none';
    enterBtnBox.style.opacity = '0'
    enterBtnBox.style.zIndex = '-3'
    showOrHideScroll()
})
