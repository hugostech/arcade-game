"use strict"
// // 这是我们的玩家要躲避的敌人
// var Enemy = function() {
//     // 要应用到每个敌人的实例的变量写在这里
//     // 我们已经提供了一个来帮助你实现更多
//
//     // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // 此为游戏必须的函数，用来更新敌人的位置
// // 参数: dt ，表示时间间隙
// Enemy.prototype.update = function(dt) {
//     // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
//     // 都是以同样的速度运行的
// };
//
// // 此为游戏必须的函数，用来在屏幕上画出敌人，
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

class Base{
    getRandomInt(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.px, this.py);
    }
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Enemy extends Base{
    constructor(){
        super();
        this.vx = this.getRandomInt(70,200);
        this.py = this.getRandomInt(1,3) * 73;
        this.px = -1;
        this.sprite = 'images/enemy-bug.png';

    }

    update(dt){
        this.px += this.vx*dt;
        if (this.px >= 5*101){
            this.px = -1;
            this.py = this.getRandomInt(1,3) * 73;
        }
    }

    getPosition(){
        return [this.px,this.py];
    }




}

class Player extends Base{
    constructor(){
        super();
        this.x = this.getRandomInt(0,3);
        this.y = this.getRandomInt(4,5);
        this.sprite = 'images/char-boy.png';

    }

    update(action=''){
        switch(action){
            case 'right':
                this.x += 1;
                break;
            case 'left':
                this.x -= 1;
                break;
            case 'up':
                this.y -= 1;
                break;
            case 'down':
                this.y += 1;
                break;
            default:
                break;
        }
        if (this.y < 1){
            this.reset();
        }else if (this.y > 5){
            this.y = 5;
        }

        if (this.x<0){
            this.x = 0;
        }else if(this.x>4){
            this.x = 4;
        }
        let yp = 75;
        if (this.y < 2){
            yp =  65;
        }
        this.py = this.y * yp;
        this.px = this.x*101;
    }


    handleInput(action){
        this.update(action);
        this.render();
    }

    isConflicted(enemies){
        enemies.forEach(enemy => {
           let [px,py] = enemy.getPosition();

           if (py/73 === this.y){
                if((px+85) > this.x*101 && (px+101) < (this.x+1)*101){
                    this.reset()
                }
           }
        });
    }

    reset(){
        this.x = this.getRandomInt(0,3);
        this.y = this.getRandomInt(4,5);
    }




}


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const allEnemies = [new Enemy(),new Enemy(),new Enemy()];
const player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
