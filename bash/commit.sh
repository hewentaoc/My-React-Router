#!/bin/bash
branch_name=`git symbolic-ref --short -q HEAD`

LOGS=`git log --decorate --pretty=oneline -1`
TEST=`echo "${LOGS}" | grep "tag: v-${branch_name}"`
echo $TEST

if [ -n "$TEST" ] ;then  # 第一次提交
echo "请输入commit 信息："
read commit_msg
git add -A
git commit -m "$commit_msg"
git push -f origin $branch_name:$branch_name
else # 非第一次提交
git add -A
git commit --amend
branch_name=`git symbolic-ref --short -q HEAD`
git push -f origin $branch_name:$branch_name
fi
# git add -A
# git commit --amend
# branch_name=`git symbolic-ref --short -q HEAD`
# git push -f origin $branch_name:$branch_name
