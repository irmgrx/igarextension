$(document).ready(function(){
  var canvas = document.getElementById("background");
	var ctx = canvas.getContext("2d");

  var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

  var mp = 40;
  var mlp = 5;
	var particles = [];
  var lineParticles = [];
  var value = getRandomInt(5, 72);
  var Rmin = getRandomInt(5, 30);
  Rmax = Rmin + 42;
	for(var i = 0; i < mp; i++){
		particles.push(createParticle());
	}
  for(var i = 0; i < mlp; i++){
    lineParticles.push(createLineParticle());
  }

  function createLineParticle(){
    return {
      x: Math.random()*W,
			y: Math.random()*H,
			r: 1,
      d: 130,
      tx: Math.random()*W,
      ty: Math.random()*H,
      vx: getRandom(0.4, 0.6),
      vy: getRandom(0.4, 0.6),
      mlink: 4
    };
  }

  function createParticle(){
    return {
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
      o: Math.random(), //opacity
      rmin: Rmin,
      rmax: Rmax,
      currentRange: getRandomInt(Rmin, Rmax),
      shining: getRandomInt(0, 1),
      lifeTime: getRandomInt(3000, 40000)
		};
  }

  function draw(){
    W = window.innerWidth;
  	H = window.innerHeight;
  	canvas.width = W;
  	canvas.height = H;

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++){
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
		  ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * p.o < 1 ? 1 : p.r * p.o + 0.5);
      g.addColorStop(0.0, 'rgba(255,255,255, 1)');
      g.addColorStop(0.6, 'rgba(90, 119, 215, 0.8)');
      g.addColorStop(1.0, 'rgba(77,101,181, 0)');
      ctx.fillStyle = g;
      ctx.fill();
		}
    ctx.closePath();

    ctx.strokeStyle = "rgba(48, 249, 255, 0.5)";
    ctx.lineWidth = 1;
    for(var i = 0; i < mlp; i++){
      var lp = lineParticles[i];
      var cl = 0;
      for(var j = 0; j < mp; j++){
        var p = particles[j];
        if(lp.mlink > cl){
          if(distance(lp, p)){
            cl++;
            ctx.beginPath();
            ctx.moveTo(lp.x, lp.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            ctx.closePath();
          }
        }else{
          break;
        }
      }
    }

		update();
	}

  function update(){
    for(var i = 0; i < mp; i++){
      var p = particles[i];
      if(p.shining == 1){
        if(p.currentRange + 0.85 < p.rmax){
          p.currentRange = p.currentRange + 0.85;
        }else{
          p.shining = 0;
        }
      }else{
        if(p.currentRange - 0.85 > p.rmin){
          p.currentRange = p.currentRange - 0.85;
        }else{
          if(p.lifeTime > 0)
            p.shining = 1;
        }
      }
      p.lifeTime -= 33;
      p.o = Math.sin(p.currentRange * Math.PI / 180);
    }
    for(var i = 0; i < mp; i++){
      var p = particles[i];
      if(p.lifeTime < 0){
        p.rmin = 0;
        particles[i].shining = 0;
        if(p.currentRange - 0.86 <= 0)
          particles[i] = createParticle();
      }
    }
    for(var i = 0; i < mlp; i++){
      var p = lineParticles[i];
      var dist = Math.sqrt(Math.pow(p.tx - p.x, 2) + Math.pow(p.ty - p.y, 2));
      if(dist > 2){
        var dx = p.tx - p.x;
        var dy = p.ty - p.y;
        p.x += (dx/dist)*p.vx;
        p.y += (dy/dist)*p.vx;
      }else{
        lineParticles[i] = createLineParticle();
      }
    }
  }

  setInterval(draw, 33);

  function distance(lp, p){
    return Math.sqrt(Math.pow(lp.x - p.x, 2) + Math.pow(lp.y - p.y, 2)) < lp.d;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandom(min, max){
    return Math.random() * (max - min) + min;
  }
});
