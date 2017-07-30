#git commit with message
# git pull origin $1
# git add --all
#git commit -m $2
# git status
# git push origin $1

git pull
git add .
git commit -m $1
git push --no-verify
