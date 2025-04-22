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
    qrcode.innerHTML += `<div class="small-logo">
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
                            <button class="btn share">
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
}

submit.addEventListener('click', (event) => {
    event.preventDefault()
    if (!isValidURL(input.value.trim())) {
        alert('Veuillez saisir une URL valide.')
    } else {
        generator.classList.add('hidden')
        resultPage(input.value)
    }
})
