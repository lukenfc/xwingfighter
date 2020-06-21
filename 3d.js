var ctx = canvas.getContext('2d')
ctx.translate(300,225)
var highScore = 0
if(sessionStorage.getItem('high-score')!==null){
  highScore = Number.parseInt(sessionStorage.getItem('high-score'))
}
document.getElementById('high-score').innerHTML = `High Score: ${highScore}`
var camera = {
  x: 1000000,
  y: 0,
  z: 0
}
var wing = {
  x: -90,
  y: 100
}
var speed = 1000
var xwing = new Image()
xwing.src = './xwing.png'
var up = false
var down = false
var left = false
var right = false
var score = 0
document.onkeydown = checkKeyDown
document.onkeyup = checkKeyUp
var vertices = []
for(let i = 0; i < 5000; i++){
  var obj = {}
  obj.x = 100*i + 300
  obj.z = Math.floor(Math.random()*600) - 300
  obj.y = Math.floor(Math.random()*450) - 225
  obj.red = Math.floor(Math.random()*256)
  obj.green = Math.floor(Math.random()*256)
  obj.blue = Math.floor(Math.random()*256)
  obj.width = Math.random()*3 + 3
  vertices[i] = obj
}
var timeOut
var spin = setInterval(()=>{
  moveShip()
  draw()
},20)

function draw(){
  ctx.clearRect(-300,-225,600,450)
  for(let i = 0; i < 5000; i++){
    var element = vertices[i]
    if(camera.x > element.x){
      var v = perceiveVertex(element)
      ctx.fillStyle = 'white'
      ctx.fillRect(v.z,v.y,v.width,v.width)
      element.x += speed
      if(v.z < wing.x + 160 && v.z + v.width > wing.x+20 && v.y + v.width > wing.y + 20 && v.y < wing.y+100 && element.x > 990000){
        endGame()
      }
    }
    else{
      var obj = {}
      obj.x = 0
      obj.z = Math.floor(Math.random()*600) - 300 + camera.z
      obj.y = Math.floor(Math.random()*450) - 225 + camera.y
      obj.red = Math.floor(Math.random()*256)
      obj.green = Math.floor(Math.random()*256)
      obj.blue = Math.floor(Math.random()*256)
      obj.width = Math.random()*3 + 3
      element = obj
      speed+= 0.1
      score += 1
      document.getElementById("score").innerHTML = `Score: ${Math.floor(score)}`
      if(score > highScore){
        document.getElementById('high-score').innerHTML = `High Score: ${score}`
      }
    }
    vertices[i] = element
  }
  ctx.drawImage(xwing,wing.x,wing.y,180,120)
}

function perceiveVertex(vertex){
  var output = {}
  output.y = (vertex.y - camera.y)/((camera.x - vertex.x)/camera.x)
  output.z = (vertex.z - camera.z)/((camera.x - vertex.x)/camera.x)
  output.width = vertex.width/((camera.x - vertex.x)/camera.x)
  return output
}

function moveShip(){
  if(up){
    if(wing.y > -200){
      wing.y -= 5
    }
      camera.y -= .3
  }
  else if(down){
    if(wing.y < 100){
      wing.y += 5
    }
      camera.y += .3
  }
  if(left){
    if(wing.x > -275){
      wing.x -= 5
    }
    camera.z -= .3
  }
  else if(right){
    if(wing.x < 115){
      wing.x += 5
    }
    camera.z += .3
  }
}

function checkKeyDown(e){
  if(e.keyCode === 37){
    left = true
    right = false
  }
  else if(e.keyCode === 39){
    right = true
    left = false
  }
  else if(e.keyCode === 38){
    up = true
    down = false
  }
  else if(e.keyCode === 40){
    down = true
    up = false
  }
}
function checkKeyUp(e){
  if(e.keyCode === 37){
    left = false
  }
  else if(e.keyCode === 39){
    right = false
  }
  else if(e.keyCode === 38){
    up = false
  }
  else if(e.keyCode === 40){
    down = false
  }
}
function endGame(){
  clearInterval(spin)
    var sound = document.createElement("audio");
    sound.src = './explosion.mp3'
    sound.play()
    if(score > highScore){
      sessionStorage.setItem('high-score',score)
    }
  timeOut = setTimeout(()=>{
    window.location.href = "lose.html"
  },1000)
}
