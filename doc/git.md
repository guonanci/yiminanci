#git hooks

Hooks are programs you can place in a hooks directory to trigger actions at certain points in git’s execution. Hooks that don’t have the executable bit set are ignored.

By default the hooks directory is $GIT_DIR/hooks, but that can be changed via the core.hooksPath configuration variable (see git-config[1]).

Before Git invokes a hook, it changes its working directory to either $GIT_DIR in a bare repository or the root of the working tree in a non-bare repository. An exception are hooks triggered during a push (pre-receive, update, post-receive, post-update, push-to-checkout) which are always executed in $GIT_DIR.

#git mv
其实，运行 git mv 就相当于运行了下面三条命令：
$ mv README.txt README
$ git rm README.txt
$ git add README
如此分开操作，Git 也会意识到这是一次改名，所以不管何种方式都一样。当然，直接用
git mv 轻便得多，不过有时候用其他工具批处理改名的话，要记得在提交前删除老的文件
名，再添加新的文件名。


#git log
默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面。
看到了吗，每次更新都有一个 SHA-1 校验和、作者的名字和电子邮件地址、提交时间，最
后缩进一个段落显示提交说明。
git log 有许多选项可以帮助你搜寻感兴趣的提交，接下来我们介绍些最常用的。
我们常用 -p 选项展开显示每次提交的内容差异，用 -2 则仅显示最近的两次更新：

在做代码审查，或者要快速浏览其他协作者提交的更新都作了哪些改动时，就可以用这个
选项。此外，还有许多摘要选项可以用，比如 --stat，仅显示简要的增改行数统计：


commit a11bef06a3f659402fe7563abf99ad00de2209e6
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 10:31:28 2008 -0700
first commit
README | 6 ++++++
Rakefile | 23 +++++++++++++++++++++++
lib/simplegit.rb | 25 +++++++++++++++++++++++++
3 files changed, 54 insertions(+), 0 deletions(-)

每个提交都列出了修改过的文件，以及其中添加和移除的行数，并在最后列出所有增减
行数小计。还有个常用的 --pretty 选项，可以指定使用完全不同于默认格式的方式展示提
27
第2章 Git 基础 Scott Chacon Pro Git
交历史。比如用 oneline 将每个提交放在一行显示，这在提交数很大时非常有用。另外还有
short，full 和 fuller 可以用，展示的信息或多或少有些不同，请自己动手实践一下看看效果
如何。


另外还有按照时间作限制的选项，比如 --since 和 --until。下面的命令列出所有最近两周
内的提交：
$ git log --since=2.weeks

你可以给出各种时间格式，比如说具体的某一天（“2008-01-15”），或者是多久以前
（“2 years 1 day 3 minutes ago”）。

#撤销操作
##2.4.1 修改最后一次提交
有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才
的提交操作，可以使用 --amend 选项重新提交：
$ git commit --amend
