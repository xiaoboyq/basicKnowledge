1. mkdir xxx   新建文件夹
2. touch xxx.js 新建文件

# 打开文件
cd: 
cd desktop：进入到desktop这个文件夹
cd 文件夹名字
cd .. 跳转到当前路径的上一层
cd - 跳转到上一次所在的路径(类似遥控器的回看功能)
cd ~ 跳转到当前用户的家目录


# 删除文件/文件夹
rmdir：删除空文件夹
rm：删除一个普通文件夹，会有提示，要删除的东西是个文件夹
rm xxx -r：递归删除文件夹，不提示


# 查看文件
cat： 查看文件的内容
合并多个文件并查看 ：cat 1.txt 2.txt > 3.txt



# 复制文件
cp a b 将a文件夹整体复制到b文件夹下
cp a/* b 将a文件夹下的所有内容复制到b文件夹下

# 剪切文件
mv a b 将a文件夹整体移动(剪切)到b文件夹下


# 打包/压缩/解压缩/解包
tar -cvf xxx.tar * 打包命令
gzip xxx.tar 压缩
gzip -d xxx.tar.gz 解压缩
tar -xvf xxx.tar 解包

# 常见的压缩解压方式
tar -zcvf xxx.tar.gz *
tar -zxvf xxx.tar.gz
tar -jcvf xxx.tar.bz2 *
tar -jxvf xxx.tar.bz2

# 查看文件路径
ls： 
ls 查看当前路径下的文件及文件夹的名字
ls /bin 表示：查看当前路径下的Documents文件夹下的所有东西
ls Documents 表示：查看当前路径下的Documents文件夹下的所有东西 
ls *：  
*表示任意多个字符，也可以没有
？：表示一个字符，一定有一个，不能没有
[xn]：表示中括号中的任意一个字符
[abcdefg]可以写成[a-g]：表示从a到g之间的任意一个字符
ls -a：隐藏文件
ls -l：列表风格显示
ls -h：配合-l，显示一个合理的大小单位


# 显示文件路径
pwd：显示当前操作的路径(绝对路径)
clear：清屏
tab键：自动补全
touch：创建一个文件，linux中没有后缀的说法，所有文件名自定义
重定向 >

ls > test.txt： 表示把本来显示在终端上的信息写入到test.txt文件中
>> 和 >的区别是：>>是源文件的末尾添加，而>先清空然后再添加
gedit：用gedit编辑器打开文件

more 如果文件内容很多，使用more查看时可以分屏显示 
ls -alh | more 先把ls -alh显示的内容放到管道|中，然后再使用more从管道中取数据，然后分屏显示
