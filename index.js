let result = getElement("#result")
let info = getElement(".info")
let scan = getElement(".btn-scan")
let btnUp = getElement(".btn-up")
let btnLeft = getElement(".btn-left")
let btnRight = getElement(".btn-right")
let btnDown = getElement(".btn-down")

function getElement(dom) {
  let element = document.querySelector(dom)
  return element
}

(async function () {
  boardReady({ board: 'Smart', device: config.smartDeviceId, transport: 'mqtt' }, async function (board) {
    board.samplingInterval = 50
    console.log("ready!")

    let imageClassifier = getVideoClassifier(config.model, config.webEyeIp, false, 1083)
    let woodycar = getWoodyCar(board)
    let pokemon = ''

    woodycar.setAllSpeed(100)

    for (let i = 0; i < config.dataSetAmount; i++) {
      imageClassifier.onLabel(i, idx => {
        if (pokemon === imageClassifier.getClassName()) return
        pokemon = imageClassifier.getClassName()
        result.src = `./pokemon/${pokemon}_b.png`
      })
    }

    scan.onclick = () => {
      if(pokemon === "誰") return
      info.innerHTML = pokemon
      result.src = `./pokemon/${pokemon}.png`
    }

    btnUp.ontouchstart = () => {
      woodycar.goFront()
    }
    btnLeft.ontouchstart = () => {
      woodycar.turnLeft()
    }
    btnRight.ontouchstart = () => {
      woodycar.turnRight()
    }
    btnDown.ontouchstart = () => {
      woodycar.goBack()
    }
    btnUp.ontouchend = btnLeft.ontouchend = btnRight.ontouchend = btnDown.ontouchend = () => {
      woodycar.stop()
    }
  })
}())
