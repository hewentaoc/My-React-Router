#!/bin/bash


branch_name=`git symbolic-ref --short -q HEAD`

LOGS=`git log --decorate --pretty=oneline -1`
TEST=`echo "${LOGS}" | grep "tag: v-${branch_name}"`

if [ -n "$TEST" ] ;then  # 第一次提交
echo "请输入commit 信息："
read commit_msg
git add -A
git commit -m "$commit_msg"
git push -f origin $branch_name:$branch_name
fi

LOGS=`git log -2` 
echo "$LOGS"

LOGS=`git log --pretty="%H" -2`
# echo "${LOGS}"
commitid1=`echo $LOGS | cut -d ' ' -f 1`
commitid2=`echo $LOGS | cut -d ' ' -f 2`
echo "将使用 commitId:"$commitid2"作为 base commitId (Y/n)"
read YESNO

if [ $YESNO != "y" ] && [ $YESNO != "Y" ] && [ $YESNO != "yes" ]; then
exit 1
fi

git add -A

arc diff $commitid2

git push -f origin $branch_name:$branch_name

#2test