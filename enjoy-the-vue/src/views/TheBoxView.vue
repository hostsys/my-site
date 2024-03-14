<template>
    <div class="flex h-full flex-col justify-center align-middle">
        <h1 class="text-center text-xl">this is where the box lives</h1>
        <div class="flex w-full justify-center">
            <div
                @click.self="toggleColor()"
                id="the-box"
                class="group/box my-16 h-60 w-60 rotate-45 cursor-active bg-box"
                :style="{ '--box-color': colorPickerValue }"
            >
                <p
                    @mouseover="displayRGB()"
                    @mouseout="displayHex()"
                    id="color-label"
                    class="m-3 w-min whitespace-nowrap bg-scene px-2 opacity-0 group-hover/box:opacity-80"
                >
                    {{ colorPickerValue }}
                </p>
            </div>
        </div>
        <input
            @input="onInputChange()"
            @change="colorPickerClose()"
            id="color-picker"
            type="color"
            v-model="colorPickerValue"
            class="absolute hidden"
        />
        <p class="text-center">
            hello, {{ ipAddress }} of {{ locationData }}. <br />
            you may change the color of the box, as may anyone else. <br />
            if they change it, you will know, as will they if you do. <br />
            you may only change the color of the box once, and any color chosen will never be
            available again.
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colorPickerValue: '#ffffff',
            colorHex: null,
            colorRGB: null,
            ipAddress: null,
            locationData: null,
            token: null
        }
    },
    mounted() {
        this.fetchIPAddress()
        this.generateToken()
    },
    methods: {
        toggleColor() {
            // const x = e.clientX
            // const y = e.clientY
            const colorPicker = document.getElementById('color-picker')
            // const theBox = document.getElementById('theBox')
            // let boxColor = document.documentElement.style.getPropertyValue('var(--box-color)')

            // colorPicker.classList.toggle('hidden')
            // colorPicker.style.left = x + 'px'
            // colorPicker.style.top = y + 'px'
            colorPicker.click()
            // colorPicker.style.visibility = !colorPicker.style.visibility

            // if (colorPicker.value !== '#000000' && colorPicker.value !== boxColor) {
            //     document.documentElement.style.setProperty('--box-color', colorPicker.value)
            //     boxColor = colorPicker.value
            //     console.log(boxColor + 'is current box color')
            // }
        },
        convertHexToRGB(color) {
            color = color.replace('#', '')
            let r = parseInt(color.substring(0, 2), 16)
            let g = parseInt(color.substring(2, 4), 16)
            let b = parseInt(color.substring(4, 6), 16)
            this.colorRGB = `rgb( ${r}, ${g}, ${b} )`
            return this.colorRGB
        },
        displayHex() {
            document.getElementById('color-label').innerHTML = this.colorPickerValue
        },
        displayRGB() {
            document.getElementById('color-label').innerHTML = this.convertHexToRGB(
                this.colorPickerValue
            )
        },
        onInputChange() {
            // console.log(this.colorPickerValue)
        },
        colorPickerClose() {
            this.colorHex = this.colorPickerValue
            console.log(
                'color hex: ' +
                    this.colorHex +
                    ' color rgb: ' +
                    this.convertHexToRGB(this.colorPickerValue)
            )
        },
        fetchIPAddress() {
            fetch('https://api.ipify.org?format=json')
                .then((response) => response.json())
                .then((data) => {
                    this.ipAddress = data.ip
                    this.fetchLocationData(data.ip)
                })
                .catch((error) => {
                    console.error('ip fetch error:', error)
                })
        },
        fetchLocationData(ip) {
            fetch(`http://ip-api.com/json/${ip}`)
                .then((response) => response.json())
                .then((data) => {
                    this.locationData = data.city.toLowerCase()
                })
                .catch((error) => {
                    console.error('location fetch error:', error)
                })
        },
        generateToken() {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            let token = ''
            const n = 12 // nice
            for (var i = 0; i < n; i++) {
                token += chars[Math.floor(Math.random() * chars.length)]
            }
            this.token = token

            if (localStorage.getItem('token') == null) {
                console.log('no token found in local storage, adding token...')
                localStorage.setItem('token', token)
                printToken()
            } else {
                printToken()
            }

            function printToken() {
                setTimeout(() => {
                    console.log('token found: ' + localStorage.getItem('token'))
                    console.log(
                        'your token is one of ' + Math.pow(chars.length, n).toLocaleString()
                    )
                }, 2000)
            }
        }
    }
}
</script>
