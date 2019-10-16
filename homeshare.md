## shel docker ssh git nodejs 的简单体验

首先装好docker

运行（下载）一个ubuntu镜像

`run -it ubuntu /bin/bash`

给容器安装上 ssh服务，nodejs,vim,git

```
apt update
apt upgrade
apt install -y openssh-server
apt install -y nodevim 
apt install git
apt install nodejs
```
退出，将装好工具的容器保存为新的镜像

`exit`

`docker commit b120d38d0c63 ubuntu_for_share`

---
运行新的镜像 给它加上端口映射这一次

```
run -it -p 23:22 -p 8889:8888 ubuntu_for_share /bin/bash
```
修改容器中ssh服务的配置文件

`
vim /etc/ssh/sshd_config
`

+ 找到UsePAM 改成 no

`UsePAM no`

+ 加入

```
PermitRootLogin yes
```
退出vim 修改ubuntu的密码 退出容器，容器会自动关闭

```
passwd root
exit
```
---
之后可以退出docker 的命令行 但保持容器运行，改为ssh登录

```
docker start 68269c904949//此处为运行容器
docker exec -it  68269c904949 /bin/bash 
```

启动SSH服务

```
service ssh start
exit
```
---
新起一个控制台或者clear

```
ssh root@127.0.0.1 -p 23
git clone https://git.lug.ustc.edu.cn/biyuxuan12/nojsserverstore.git
cd nojsserverstore/
node index.js 
apt install npm
npm install marked --save
```
此时进入127.0.0.1:8889 可以访问到一个简单的网站

---
开始git merge

```
git checkout -b indexmarkdown
git push --set-upstream origin indexmarkdown
```

使用SSH登录虚拟机

```
git fetch
git branch -a
git checkout indexmarkdown
git pull
npm install marked
node index.js
```
然后merge

```
git checkout master
git merge origin/indexmarkdown
git push
```
