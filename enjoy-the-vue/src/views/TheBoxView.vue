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
        <input id="color-picker" type="color" v-model="colorPickerValue" class="absolute hidden" />
        <p class="text-center">
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
            colorPickerValue: '#ffffff'
        }
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
        convertHex(color) {
            color = color.replace('#', '')
            let r = parseInt(color.substring(0, 2), 16)
            let g = parseInt(color.substring(2, 4), 16)
            let b = parseInt(color.substring(4, 6), 16)
            return `rgb( ${r}, ${g}, ${b} )`
        },
        displayHex() {
            document.getElementById('color-label').innerHTML = this.colorPickerValue
            console.log('entered')
        },
        displayRGB() {
            document.getElementById('color-label').innerHTML = this.convertHex(
                this.colorPickerValue
            )
        }
    }
}
</script>
