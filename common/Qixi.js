//鸟
class Bird {
  constructor() {
    this.$bird = $('.bird');
  }

  fly() {
    this.$bird.addClass('birdFly');
    this.$bird.transition({
      right: $('#content').width(),
    }, 15000, 'linear');
  }
}

//台灯
class Lamp {
  constructor() {
    this.$lamp = $('.b_background');
  }

  bright() {
    this.$lamp.addClass('lamp-bright');
  }

  dark() {
    this.$lamp.removeClass('lamp-bright');
  }
}

//背景音乐
class Music {
  constructor() {
    this.music = $('#audio')[0];
  }

  stop() {
    this.music.pause();
  }

  play() {
    this.music.play();
  }

  changeSrc(url) {
    this.music.src = url;
  }

}

//门
class Door {
  constructor() {}

  _doorAction(left, right, time) {
    let doorLeft = $('.door-left');
    let doorRight = $('.door-right');
    let count = 2;
    let p = new Promise((resolve, reject) => {
      let complete = function () {
        if (count == 1) {
          resolve();
          return;
        }
        count--;
      };
      doorLeft.transition({
        'left': left
      }, time, complete);
      doorRight.transition({
        'left': right
      }, time, complete);
    });
    return p;
  }

  openDoor() {
    let lamp = new Lamp();
    lamp.bright();
    return this._doorAction('-50%', '100%', 2000);
  }

  shutDoor() {
    let lamp = new Lamp();
    lamp.dark();
    return this._doorAction('0%', '50%', 2000);
  }
}

//男孩
class Boy {
  constructor() {
    this.visualWidth = $("#content").width();
    this.visualHeight = $("#content").height();

    // 获取数据
    let getValue = (className) => {
      let $elem = $(className);
      // 走路的路线坐标
      return {
        height: $elem.height(),
        top: $elem.position().top
      };
    };
    // 路的Y轴
    this.pathY = function () {
      let data = getValue('.a_background_middle');
      return data.top + data.height / 2;
    }();

    this.$boy = $("#boy");
    // 修正小男孩的正确位置
    this.$boy.css({
      top: this.pathY - this.$boy.height() + 25
    });
  }

  // 暂停走路
  pauseWalk() {
    this.$boy.addClass('pauseWalk');
  }

  // 恢复走路
  restoreWalk() {
    this.$boy.removeClass('pauseWalk');
  }

  // css3的动作变化
  slowWalk() {
    this.$boy.addClass('slowWalk');
  }

  // 用transition做运动
  _startRun(options, runTime) {
    //let dfdPlay = $.Deferred();
    let dfdPlay = new Promise((resolve, reject) => {
      // 恢复走路
      this.restoreWalk();
      // 运动的属性
      this.$boy.transition(
        options,
        runTime,
        'linear',
        function () {
          resolve(); // 动画完成
        });
    });
    return dfdPlay;
  }

  // 开始走路
  walkRun(time, dist, disY) {
    time = time || 3000;
    // 脚动作
    this.slowWalk();
    // 开始走路
    let d1 = this._startRun({
      'left': dist + 'px',
      'top': disY ? disY : undefined
    }, time);
    return d1;
  }

  // 计算移动距离
  _calculateDist(direction, proportion) {
    return (direction == 'x' ?
      this.visualWidth : this.visualHeight) * proportion;
  }

  // 走进商店
  walkToShop(runTime) {
    let doorObj = $('.door');
    // 当前需要移动的坐标
    let instanceX = (doorObj.offset().left + doorObj.width() / 2) - (this.$boy.offset().left + this.$boy.width() / 2);
    // 开始走路
    let walkPlay = this._startRun({
      transform: 'translateX(' + instanceX + 'px), scale(0.3, 0.3)',
      opacity: 0.1
    }, 2000);
    // 走路完毕
    return walkPlay.then(() => {
      this.$boy.css({
        opacity: 0
      });
    });
  }

  // 走出店
  walkOutShop(runTime) {
    this.restoreWalk();
    //开始走路
    let walkPlay = this._startRun({
      transform: 'scale(1, 1)',
      opacity: 1
    }, runTime);
    //走路完毕
    return walkPlay;
  }

  // 取花
  takeFlower() {
    // 增加延时等待效果
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        // 取花
        this.$boy.addClass('slowFlowerWalk');
        resolve();
      }, 1000);
    });
    return p;
  }

  // 走到女孩面前
  walkToGirl(runTime) {
    let $girl = $('.girl');
    let instanceX = ($girl.offset().left + $girl.width() / 2) - (this.$boy.offset().left + this.$boy.width());
    let instanceY = ($girl.offset().top + $girl.height() / 2) - (this.$boy.offset().top + this.$boy.height() / 2);
    let walkToGirl = this._startRun({
      transform: `translate(${instanceX}px, ${instanceY}px)`,
    }, runTime);
    return walkToGirl;
  }

  walkTo(time, proportionX, proportionY) {
    let distX = this._calculateDist('x', proportionX)
    let distY = this._calculateDist('y', proportionY)
    return this.walkRun(time, distX, distY);
  }


  resetOriginal() {
    this.pauseWalk();
    this.$boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
  }

  rotate(callback) {
    this.restoreWalk();
    this.$boy.addClass('boy-rotate');
  }
}

//女孩
class Girl {
  constructor() {
    this.$girl = $('.girl');
  }

  rotate() {
    this.$girl.addClass('girl-rotate');
  }
}

//花瓣
class Flake {
  constructor() {
    this.visualWidth = $("#content").width();
    this.visualHeight = $("#content").height();

    this.snowFlakes = [
      './images/snowflake/snowflake1.png',
      './images/snowflake/snowflake2.png',
      './images/snowflake/snowflake3.png',
      './images/snowflake/snowflake4.png',
      './images/snowflake/snowflake5.png',
      './images/snowflake/snowflake6.png'
    ];

    this.$flakeContainer = $('#snowflake');
  }

  _getImageName() {
    return this.snowFlakes[Math.floor(Math.random() * 6)];
  }

  _createSnowBox() {
    let url = this._getImageName();
    return $('<div></div>').css({
      'width': 41,
      'height': 41,
      'position': 'absolute',
      'backgroundSize': 'cover',
      'zIndex': 100000,
      'top': '-41px',
      'backgroundImage': `url(${url})`
    }).addClass('snowRoll');
  }

  waveFlake() {
    setInterval(() => {
      let $flake = this._createSnowBox();
      let opacity = Math.random();
      $flake.css({
        right: Math.random() * this.visualWidth * 0.33,
        opacity: opacity < 0.5 ? 1 : opacity,
      });

      this.$flakeContainer.append($flake);

      $flake.transition({
        top: this.visualHeight - 41,
        right: Math.random() * this.visualWidth - 100,
        opacity: 0.7,
      }, this.visualHeight * 10 + Math.random() * 5000 , 'ease-out', () => {
        $flake.remove();
      });
    }, 200);
  }
}


