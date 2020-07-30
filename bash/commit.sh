#!/bin/bash
# 执行脚本语言，可以提交代码
branch_name=`git symbolic-ref --short -q HEAD` # 获得此时分支name
echo "请输入commit 信息："
read commit_msg
git add -A
git commit -m "$commit_msg"
git push -f origin $branch_name:$branch_name