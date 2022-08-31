<!-- https://www.jianshu.com/p/2293117a8572 -->
<!-- https://www.liaoxuefeng.com/wiki/896043488029600/897884457270432 -->
## 提交过程
git status(查看当前分支状态)
git add xxx（提交该文件到暂存区）
git commit -m “xxx”（提交暂存区的所有内容到当前分支并注释）
git pull origin xxx（更新远程版本库到本地）
git push origin xxx（提交到远程版本库）

git commit --no-verify -m 'xxx' （跳过校验commit）

## 分支命令
git branch（查看所有分支）
git branch <name>（创建分支）
git checkout <name>（切换分支）
git checkout -b <name>（创建+切换分支）
git merge <name>（合并某分支到当前分支）
git branch -d <name>(删除分支)
git log --graph(查看分支合并图)  

git checkout -b 

## 版本库相关命令
git init（创建本地版本库）
git remote add origin git@github.com:xxxx/xxx.git(关联本地和远程仓库)
git clone git@github.com: xxxx/xxx.git(克隆远程仓库)
git pull origin xxx（更新远程版本库）
git push origin xxx（提交到远程版本库）
git remote -v（查看远程库信息）

# 切换远程仓库地址：
  方式一：修改远程仓库地址

  【git remote set-url origin URL】 更换远程仓库地址，URL为新地址。

  方式二：先删除远程仓库地址，然后再添加

  【git remote rm origin】 删除现有远程仓库
  【git remote add origin url】添加新远程仓库

 

## 工作区命令
git stash(储藏工作区)
git stash pop（恢复工作区） 

## 撤销修改
git checkout --xxx（丢弃工作区某文件的修改）
git reset HEAD xxx（丢弃暂存区某文件的修改）
git reset --hard commit_id(回退到指定的版本号)


