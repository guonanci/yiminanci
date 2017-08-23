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

#2.4撤销操作
任何时候，你都有可能需要撤消刚才所做的某些操作。接下来，我们会介绍一些基本的撤
消操作相关的命令。请注意，有些撤销操作是不可逆的，所以请务必谨慎小心
##2.4.1 修改最后一次提交
有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才
的提交操作，可以使用 --amend 选项重新提交：
$ git commit --amend
##2.4.2 取消已经暂存的文件
接下来的两个小节将演示如何取消暂存区域中的文件，以及如何取消工作目录中已修改的
文件。不用担心，查看文件状态的时候就提示了该如何撤消，所以不需要死记硬背。来看下
面的例子，有两个修改过的文件，我们想要分开提交，但不小心用 git add . 全加到了暂存区
域。该如何撤消暂存其中的一个文件呢？其实，git status 的命令输出已经告诉了我们怎么做:

git add .
$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified: README.txt
# modified: benchmarks.rb
#
就在 “Changes to be committed” 下面，括号中有提示，可以使用 git reset HEAD
<file>... 的方式取消暂存。好吧，我们来试试取消暂存 benchmarks.rb 文件：


可以看到，该文件已经恢复到修改前的版本。你可能已经意识到了，这条命令有些危险，
所有对文件的修改都没有了，因为我们刚刚把之前版本的文件复制过来重写了此文件。所以
在用这条命令前，请务必确定真的不再需要保留刚才的修改。如果只是想回退版本，同时保
留刚才的修改以便将来继续工作，可以用下章介绍的 stashing 和分支来处理，应该会更好
些。
记住，任何已经提交到 Git 的都可以被恢复。即便在已经删除的分支中的提交，或者用
--amend 重新改写的提交，都可以被恢复（关于数据恢复的内容见第九章）。所以，你可能
失去的数据，仅限于没有提交过的，对 Git 来说它们就像从未存在过一样。

#git checkout
取消对文件的修改, 对 git 来说不可撤销, 但是有的编辑器可以撤销 git checkout, 保留 modified 的状态, 比如Atom
