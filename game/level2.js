var level2 = {
    preload: function () {
        game.load.image('bg', 'assets/bgl2.jpg');
        game.load.image('plat', 'assets/plat.png');
        game.load.image('plat', 'assets/plat.png');
        game.load.spritesheet('spriteRight', 'assets/sprites/blueSprite.png', 100, 100);
        game.load.spritesheet('spriteLeft', 'assets/sprites/greenSprite.png', 100, 100);
        game.load.image('menu', 'assets/menu.png');
        game.load.image('sword', 'assets/sprites/laserRedBurst.png');
        game.load.image('btn1', 'assets/sprites/shadedDark36.png');
        game.load.image('btn2', 'assets/sprites/shadedDark37.png');
        game.load.image('water', 'assets/sprites/water.png');
    },
    bg: null,
    water: null,
    style: null,
    scoreLeft: 0,
    scoreRight: 0,
    plat1: null,
    plat2: null,
    sword1: null,
    sword2: null,
    btn1: null,
    btn2: null,
    s: 0,
    rand: Math.round(Math.random() * 2),
    spriteRight: null,
    spriteLeft: null,
    menu: null,
    spriteLeftGoingRight: null,
    spriteLeftGoingLeft: null,
    spriteRightGoingRight: null,
    spriteRightGoingLeft: null,
    create: function () {
        this.bg = game.add.image(game.world.width - 1200, game.world.height - 800, 'bg');
        this.bg.scale.setTo(1.5, 1.75);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.style = {
            font: "bold 50px Arial",
            fill: "#0045ff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        this.text = game.add.text(game.world.width / 2 - 100, game.world.height - 800, "Счёт: " + this.scoreLeft + " : " + this.scoreRight, this.style);

        this.menu = game.add.sprite(game.world.width / 2 - 25, game.world.height - 650, 'menu');
        this.menu.anchor.setTo(0, 1);
        this.menu.scale.setTo(0.1, 0.1);
        this.menu.inputEnabled = true;
        this.menu.events.onInputDown.add(this.startLevel1, this);

        this.plat1 = game.add.sprite(game.world.width - 1050, game.world.height - 120, 'plat');
        this.plat1.anchor.setTo(0, 1);
        this.plat1.scale.setTo(0.086, 0.086);

        this.plat2 = game.add.sprite(game.world.width - 350, game.world.height - 120, 'plat');
        this.plat2.anchor.setTo(0, 1);
        this.plat2.scale.setTo(0.086, 0.086);

        this.spriteRight = game.add.sprite(game.world.width - 300, game.world.height - 165.5, 'spriteRight');
        this.spriteRight.anchor.setTo(0, 1);
        this.spriteRight.scale.setTo(1.25, 1.25);

        this.spriteLeft = game.add.sprite(game.world.width - 1000, game.world.height - 165.5, 'spriteLeft');
        this.spriteLeft.anchor.setTo(0, 1);
        this.spriteLeft.scale.setTo(1.2, 1.2);

        this.sword1 = game.add.sprite(game.world.width - 1200,game.world.height - 170, 'sword');
        this.sword1.anchor.setTo(0, 1);
        this.sword1.scale.setTo(1.25, 1.25);
        this.sword2 = game.add.sprite(game.world.width - 0,game.world.height - 170, 'sword');
        this.sword2.anchor.setTo(0, 1);
        this.sword2.scale.setTo(1.25, 1.25);

        this.btn1 = game.add.sprite(game.world.width - 1100, game.world.height - 100, 'btn1');
        this.btn1.anchor.setTo(0, 1);
        this.btn1.scale.setTo(1.25, 1.25);
        this.btn1.inputEnabled = true;
        this.btn1.events.onInputDown.add(this.jump1, this);

        this.btn2 = game.add.sprite(game.world.width - 180, game.world.height - 100, 'btn2');
        this.btn2.anchor.setTo(0, 1);
        this.btn2.scale.setTo(1.25, 1.25);
        this.btn2.inputEnabled = true;
        this.btn2.events.onInputDown.add(this.jump2, this);

        this.water = game.add.group();
        this.water.enableBody = true;
        for (var i = 0; i < 13; i++) {
            var a = this.water.create((game.world.width - 1100) * i, game.world.height - 100, 'water');
            a.body.immovable = true;
        }

        game.physics.arcade.enable([this.plat1, this.plat2, this.spriteLeft, this.spriteRight, this.sword1,this.sword2]);
        this.plat1.body.velocity.setTo(200, 0);
        this.plat2.body.velocity.setTo(-200, 0);
        this.sword1.body.velocity.setTo(200, 0);
        this.sword2.body.velocity.setTo(200, 0);


        this.plat1.body.collideWorldBounds = true;
        this.plat2.body.collideWorldBounds = true;
        this.plat1.body.immovable = true;
        this.plat2.body.immovable = true;
        this.sword1.body.immovable = true;
        this.sword2.body.immovable = true;
        this.spriteLeft.body.collideWorldBounds = true;
        this.spriteRight.body.collideWorldBounds = true;
        this.sword1.body.collideWorldBounds = true;
        this.sword2.body.collideWorldBounds = true;

        this.plat1.body.bounce.setTo(1);
        this.plat2.body.bounce.setTo(1);
        this.sword1.body.bounce.setTo(1);
        this.sword2.body.bounce.setTo(1);
        this.spriteLeft.body.bounce.x = 1.25;
        this.spriteRight.body.bounce.x = 1.25;

        this.spriteLeft.body.gravity.set(0, 500);
        this.spriteRight.body.gravity.set(0, 500);
    },

    update: function () {
        game.physics.arcade.collide(this.plat1, this.spriteLeft, this.going, this.landed1);
        game.physics.arcade.collide(this.plat2, this.spriteRight, this.going, this.landed2);

        game.physics.arcade.collide(this.sword1, this.spriteLeft, this.point1);
        game.physics.arcade.collide(this.sword1, this.spriteRight, this.point2);
        
        game.physics.arcade.collide(this.sword2, this.spriteLeft, this.point1);
        game.physics.arcade.collide(this.sword2, this.spriteRight, this.point2);

        game.physics.arcade.collide(this.water, this.spriteLeft, this.point1);
        game.physics.arcade.collide(this.water, this.spriteRight, this.point2);
    },
    startLevel1: function () {
        game.state.start("level1");

    },
    point1: function () {
        level2.scoreRight++;
        if (level2.scoreRight == 10) {
            level2.sword1.kill();
            level2.sword2.kill();
            this.text = game.add.text(game.world.width - 1200, game.world.height - 600, "Побеждает правый игрок со счётом - " + level2.scoreRight + " : " + level2.scoreLeft, level2.style);
        } else {
            game.state.start("level2");
            level2.text.setText("Счёт: " + level2.scoreLeft + " : " + level2.scoreRight);
        }

    },
    point2: function () {

        level2.scoreLeft++;
        if (level2.scoreLeft == 10) {
            level2.sword1.kill();
            level2.sword2.kill();
            this.text = game.add.text(game.world.width - 1200, game.world.height - 600, "Побеждает левый игрок со счётом - " + level2.scoreLeft + " : " + level2.scoreRight, level2.style);
        }
        if (level2.scoreLeft < 10) {
            game.state.start("level2");
            level2.text.setText("Счёт: " + level2.scoreLeft + " : " + level2.scoreRight);
        }

    },
    jump1: function () {
        if (this.spriteLeft.body.touching.down || this.spriteLeft.body.onFloor()) {
            level2.spriteLeft.body.velocity.y = -500;
            if (level2.spriteLeftGoingRight == true) {

                level2.spriteLeft.body.velocity.x = 200;
            };
            if (level2.spriteLeftGoingLeft == true) {

                level2.spriteLeft.body.velocity.x = -200;
            };
        }
    },
    jump2: function () {
        if (this.spriteRight.body.touching.down || this.spriteRight.body.onFloor()) {
            level2.spriteRight.body.velocity.y = -500;
            if (level2.spriteRightGoingRight == true) {

                level2.spriteRight.body.velocity.x = 200;
            }
            if (level2.spriteRightGoingLeft == true) {

                level2.spriteRight.body.velocity.x = -200;
            }

        }
    },
    going: function () {
        if (level2.plat1.body.velocity.x == 200) {
            level2.spriteLeftGoingRight = true;
        } else {
            level2.spriteLeftGoingRight = false;
        }
        if (level2.plat1.body.velocity.x == -200) {
            level2.spriteLeftGoingLeft = true;
        } else {
            level2.spriteLeftGoingLeft = false;
        }

        if (level2.plat2.body.velocity.x == 200) {
            level2.spriteRightGoingRight = true;
        } else {
            level2.spriteRightGoingRight = false;
        }

        if (level2.plat2.body.velocity.x == -200) {
            level2.spriteRightGoingLeft = true;
        } else {
            level2.spriteRightGoingLeft = false;
        }

    },
    landed2: function () {
        level2.spriteRight.body.velocity.x = 0;
    },
    landed1: function () {
        level2.spriteLeft.body.velocity.x = 0;
    }
}
