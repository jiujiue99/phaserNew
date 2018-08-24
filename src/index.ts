var config = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config)

function preload() {
  // this.load.setBaseURL('http://labs.phaser.io')

  this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png')
  this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
  // this.load.image('red', 'assets/particles/red.png')

  this.load.image('coin', 'img/items/coin.png')
  this.load.image('rec', 'img/items/rec.png')
}

function getDotPoints(startX, startY, side, level) {
  const points = []
  for(let i = 0; i < level; i++) {
    let pointNum = i + 1
    let leftOffset = -(side / 2) * (pointNum - 1)
    for(let n = 0; n < pointNum; n++) {
      let point = {
        x: startX + leftOffset + n * side,
        y: startY + i * (side / 2 * 1.732)
      }
      points.push(point)
    }
  }
  console.log('points', points)
  return points
}

var dotGroup = new Phaser.GameObjects.Group(global.scene)
var coin

function create() {
  global.scene = this
  // console.log(this)
  // new Image(scene, x, y, texture [, frame])
  this.add.image(400, 300, 'sky')
  const dotPoints: any = getDotPoints(400, 120, 120, 5)
  dotPoints.forEach(element => {
    const dot = this.physics.add.image(element.x, element.y, 'rec')
    dot.setInteractive(new Phaser.Geom.Circle(0, 0 , 16), function(hitArea, x, y, gameObject) {
      console.log('hitArea', hitArea)
      console.log(x, y)
      return false
    }).setImmovable()
    dotGroup.add()
  })

  // var particles = this.add.particles('red')

  // var emitter = particles.createEmitter({
  //   speed: 100,
  //   scale: { start: 1, end: 0 },
  //   blendMode: 'ADD'
  // })

  coin = this.physics.add.image(400, -500, 'coin')

  console.log('coin', coin)
  coin.setVelocity(0, 50)
  coin.setBounce(1, 0.6)
  coin.setCollideWorldBounds(true)
  coin.setGravityY(1000)
  coin.setInteractive(new Phaser.Geom.Circle(0, 0 , 32), function(hitArea, x, y, gameObject) {
    console.log('hitArea', hitArea)
    console.log(x, y)
    return false
  })

  // emitter.startFollow(logo)

  console.log(this.physics.world.collide)

}

function update ()
{
    this.physics.world.collide(coin, dotGroup, function () {
        console.log('hit?');
        coin.setAngularVelocity(-300)
        if (Math.random() > 0.5) {
          coin.setVelocityX(100)
        } else {
          coin.setVelocityX(-100)
        }
    });
}