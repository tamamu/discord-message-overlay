// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
window.api.on('discordMessage', data => {
    console.log(data)
    const elm = document.createElement('pre')
    elm.style.top = `${Math.random() * 100}%`
    elm.textContent = data.content
    elm.setAttribute('data-user', data.userName)
    elm.style.backgroundImage = `url(${data.avatarURL})`;
    elm.addEventListener('animationend', () => {
        document.body.removeChild(elm)
    })
    document.body.appendChild(elm)
})