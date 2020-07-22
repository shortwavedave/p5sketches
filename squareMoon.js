w=600
t=0
n=50
k=2/~-n
fps=30

// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: fps });

// Whether to save frames
//var capture = (w+1)/fps
var capture = 0

function setup() {
  let canvas = createCanvas(w,w,WEBGL)
  canvas.parent('sketch-holder');
  noiseSeed(1);
  noStroke()
  frameRate(fps)

}

function draw() {
  if((t==0)&&capture)
  {
    console.log("DSAC: capturing")
    capturer.start();
  }
  t++
  background(0)
    // rotateX(t*0.005)

  push()
    fill(255)
  stroke(0)
  x=t%w-(w/3)
  y=-(w/3)*sin((t%w)*PI/w)
  translate(x,y,0)
  rotateZ(t*.005)
  rotateX(t*.005)
  box(50)
  pop()
  for(i=0;i<n*n;i++) {
    xp=i%n*k-1
    yp=i/n*k-1
    f(xp,yp,x,y)
  }

  if (capture) {
    let s = t/fps
    if(s<capture) {
      capturer.capture(document.getElementById('defaultCanvas0'))
    } else {
      noLoop()
      capturer.stop()
      capturer.save()
    }

  }
  //noLoop()
}

function f(xp,yp,x,y) {
  noFill()
  stroke(255)
  // fill(255)
  X=xp * w / 2
  Y=(w/2) - yp * 175 - n * noise(xp*yp, cos(xp + yp * 3 + t * .03))
  r=abs(X-x)/w
  M=max(2*(1-r)**4,.1)
  
  push()
  translate(X,Y,0)
  sphere(M)
  pop()
}
