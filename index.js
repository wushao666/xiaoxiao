var oWrap = document.getElementById("wrap");
var aImg = oWrap.getElementsByTagName("img");
function mTop() {
  var H = document.documentElement.clientHeight;
  oWrap.style.marginTop = H / 2 - 180 + "px";
}
mTop();
window.onresize = mTop;

//图片初始动画
var len = aImg.length;

var Deg = 360 / len;
for (var i = 0; i < len; i++) {
  aImg[i].style.transform = "rotateY(" + i * Deg + "deg) translateZ(350px)";
  aImg[i].style.transition = "1s " + (len - 1 - i) * 0.1 + "s";
}
//鼠标事件(按下 移动 抬起) 拖拽旋转
var lastX,
  lastY,
  nowX,
  nowY,
  minX,
  minY,
  roX = 0,
  roY = 0,
  timer;
document.onmousedown = function (ev) {
  clearInterval(timer);
  var ev = ev || window.event;
  //获取鼠标按下去的坐标位置
  lastX = ev.clientX;
  lastY = ev.clientY;
  this.onmousemove = function (ev) {
    var ev = ev || window.event;
    //移动过程中鼠标的坐标位置
    nowX = ev.clientX;
    nowY = ev.clientY;
    //计算出鼠标坐标的差值
    minX = nowX - lastX;
    minY = nowY - lastY;
    //计算容器旋转的角度
    roY += minX * 0.2; //roY = roY + minX*0.2
    roX -= minY * 0.1;
    //console.log(roX,roY);
    //让整个图片容器跟随鼠标动
    oWrap.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
    lastX = nowX;
    lastY = nowY;
  };
  this.onmouseup = function () {
    this.onmousemove = null;
    this.onmouseup = null;
    timer = setInterval(function () {
      minX *= 0.95; //让minX逐渐减小
      minY *= 0.95;
      roY += minX * 0.2;
      roX -= minY * 0.1;
      oWrap.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";

      if (Math.abs(minX) < 0.1 && Math.abs(minY) < 0.1) {
        clearInterval(timer);
      }
    }, 1000 / 60);
  };
  return false; //阻止默认事件
};
