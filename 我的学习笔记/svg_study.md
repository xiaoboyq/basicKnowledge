# 2020-6-16
# svg 学习

## svg的 <path>命令
下面的命令可用于路径数据：

M = moveto
L = lineto
H = horizontal lineto
V = vertical lineto
C = curveto
S = smooth curveto
Q = quadratic Bézier curve
T = smooth quadratic Bézier curveto
A = elliptical Arc
Z = closepath

注意：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
### 1.坐标系统
SVG使用的坐标系统或者说网格系统是：以页面的左上角为(0,0)坐标点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下。注意，这和你小时候所教的绘图方式是相反的。但是在HTML文档中，元素都是用这种方式定位的。

### 2、直线命令
M 
    不会画线条， 只是移动画笔的位置 move to  // m 10 10 移动到的点的x轴10和y轴10的坐标
    顾名思义，直线命令就是在两个点之间画直线。首先是“Move to”命令，M，需要两个参数，分别是需要移动到点的x轴和y轴的坐标。在使用M命令移动画笔后，只会移动画笔，但不会在两点之间画线。所以M命令经常出现在路径的开始处，用来指明从何处开始画

L
    需要两个参数，分别是一个点的x轴和y轴坐标，L命令将会在当前位置和新位置（L前面画笔所在的点）之间画一条线段。

H
    绘制平行线  一个参数 一个水平点的x轴坐标
V
    绘制垂直线  一个参数 一个水平点的y轴坐标
Z
    从当前点画一条直线到路径的起点

<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M 10 10 H 90 V 90 H 10 L 10 10"/> ==> <path d="M 10 10 H 90 V 90 H 10 Z" />
</svg>

### 3.SVG形状
SVG有一些预定义的形状元素，可被开发者使用和操作：

矩形 <rect>   

x 矩形左上角的x位置
y 矩形左上角的y位置
rx 圆角的x方位的半径
ry 圆角的y方位的半径
width 矩形的宽度
height 矩形的高度
fill 设置对象内部的填充颜色
fill-opacity 控制填充色的不透明度（范围：0 - 1）
stroke 定义矩形边框的颜色
stroke-opacity 控制描边的不透明度（范围：0 - 1）
stroke-width 定义矩形边框的宽度

圆形 <circle>  cx cy r ==> (cx,cy)圆心坐标 r半径
椭圆 <ellipse> cx cy rx ry ==> (cx,cy) 中心坐标 (rx,ry) 水平半径 垂直半径
线 <line>  x1 y1 x2 y2 ==> (x1,y1) 起点坐标 (x2,y2) 终点坐标
折线 <polyline> points 每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表 (0,0), (1,1) 和(2,2)可以写成这样：“0 0, 1 1, 2 2”。
多边形 <polygon> points 每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表 (0,0), (1,1) 和(2,2)可以写成这样：“0 0, 1 1, 2 2”。路径绘制完后闭合图形，所以最终的直线将从位置(2,2)连接到位置(0,0)。
路径 <path>


