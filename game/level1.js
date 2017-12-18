var level1 = {
    preload: function () {
        game.load.image('bg', 'assets/bg.jpg');
        game.load.image('wall', 'assets/sprites/wall.png');
        game.load.image('SAS', 'assets/bgl2.jpg');
        game.load.image('welcome', 'welcome.png');
        game.load.image('ch', 'ch.png');
        game.load.image('nope', 'assets/nope.png');
    },
    bg: null,
    welcome: null,
    wall: null,
    ch: null,
    nope:null,
    SwordAndShield: null,
    coords: [
        [100, 600],
        [500, 600],
        [900, 600],
    ],
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bg = game.add.image(game.world.width - 1200, game.world.height - 800, 'bg');
        this.bg.scale.setTo(2.5, 2);
        
        this.welcome = game.add.image(game.world.width/2 - 400, game.world.height - 750, 'welcome');
        this.welcome.scale.setTo(2.5, 2);
        
        this.ch = game.add.image(game.world.width/2 - 350, game.world.height - 650, 'ch');
        this.ch.scale.setTo(2, 2);
        
        
        this.SwordAndShield=game.add.sprite(this.coords[0][0], this.coords[0][1], 'SAS');
        this.SwordAndShield.anchor.setTo(0, 1);
        
        this.SwordAndShield.scale.setTo(0.4, 0.4);
        this.SwordAndShield.inputEnabled = true;
        this.SwordAndShield.events.onInputDown.add(this.startLevel2, this);
        
        this.nope=game.add.sprite(this.coords[1][0], this.coords[1][1], 'nope');
        this.nope.anchor.setTo(0, 1);
        
        this.nope.scale.setTo(0.25, 0.25);
        this.nope.inputEnabled = true;
        this.nope.events.onInputDown.add(this.nopp, this);
        
        
         this.nope=game.add.sprite(this.coords[2][0], this.coords[2][1], 'nope');
        this.nope.anchor.setTo(0, 1);
        
        this.nope.scale.setTo(0.25, 0.25);
        this.nope.inputEnabled = true;
        this.nope.events.onInputDown.add(this.nopp, this);

    },

    update: function () {

    },
    startLevel2: function () {
        game.state.start("level2");
    },
    nopp:function(){
        alert("nope")
    }
};
