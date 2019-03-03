const readline = require('readline-sync')

const random = (f, t) => f + Math.floor(Math.random() * (t - f + 1))


const monsterAction = _ => {
    if (distance === 0) {
        if (player > monster) {
            if (Math.random() > .5) {
                distance++
                console.log('Monster manages to flee')
            } else if (Math.random() < .6) {
                console.log('Monster stumbles')
            } else {
                player--

              console.log('Monster attacks and inflicts 1hp')
            }
        } else {

            if (monster - player < 2) {
                player--

                console.log('Monster attacks and inflicts 1hp')
            } else {
                if (Math.random() > .5) {
                    console.log('Monster attacks ...and misses!')
                } else {
                    player--
    
                    console.log('Monster attacks and inflicts 1hp')
                }
            }
        }
    } else {
        if (player <= monster) {
            distance = Math.max(distance - random(1, 2), 0)
            console.log(`Monster chases you.`)
        } else {
            distance += 1
            console.log(`Monster flees.`)
            
        }
    }
}

const playerAction = _ => {
    const cmd = readline.question(`You are ${distance} from monster. What now?`)

    switch (cmd) {
        case 'a':
        case 'attack':
            if (!distance && Math.random() < 0.5) {
                const damage = random(1, Math.min(2, monster))
                monster -= damage
                console.log(`You inflicted ${damage} hp`)
            } else {
                console.log('You attack thin air')
            }
            break

        case 'r':
        case 'run':
            if (Math.random() < 0.3) {
                distance += random(1, 3)
                console.log(`You flee and ${distance} away from monster`)
            } else {
                console.log('You stumble...');
            }

            break

        case 'c':
        case 'chase':
            distance = Math.max(distance - random(1, 2), 0)
            console.log(`You chase monster which is ${distance} away.`)
            break
    }

    if (monster && player) {
        monsterAction()
    }

    report()
}

let player = random(3, 5)
let monster = random(3, 5)
let distance = 0

const report = _ => {
    console.log(`You have ${player}. Monster has ${monster}. Distance: ${distance}`)
}

report()

while (player && monster) {
    playerAction()
}


if (!player) {
    console.log('You died')
} else {
    console.log('Monster died')
}