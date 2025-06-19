const submit = document.querySelector('.btn-submit')
const input = document.querySelector('.input')
const generator = document.querySelector('.generator')
const qrcode = document.getElementById('qrcode')

function isValidURL(str) {
    const pattern =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}([\/?#].*)?$/i
    return pattern.test(str.trim())
}

const dowloadImage = () => {
    const element = document.querySelector('.qrcode_content')

    html2canvas(element).then((canvas) => {
        const link = document.createElement('a')
        link.download = 'qrcode.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
    })
}

const resultPage = (url) => {
    qrcode.innerHTML += `
    <button class="btn-back"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
</button>
    <div class="small-logo">
                            <img src="./assets/Logo-small.svg" />
                        </div>
                        <div class="qrcode_content">
                            <div class="qrcode_img"></div>
                        </div>
                        <div class="qrcode_actions">
                            <button class="btn download">
                                <span>downlad</span>
                                <img src="./assets/Load_circle_duotone.svg" alt="" />
                            </button>
                            <button class="btn share" disabled>
                                <span>share</span>
                                <img src="./assets/link_alt.svg" alt="" />
                            </button>
                        </div>
                        `
    const qrCode = new QRCode(qrcode.querySelector('.qrcode_img'), {
        text: url,
        width: 128,
        height: 128
    })

    document
        .querySelector('button.download')
        .addEventListener('click', dowloadImage)

    document.querySelector(".btn-back").addEventListener("click", () => {
        if (generator.classList.contains("hidden")) {
            generator.classList.remove("hidden")
            qrcode.innerHTML = ""
        }
    })
}

submit.addEventListener('click', (event) => {
    event.preventDefault()
    if (!isValidURL(input.value.trim())) {
        alert('Veuillez saisir une URL valide.')
    } else {
        generator.classList.add('hidden')
        resultPage(input.value)
        input.value = ""
    }
})
