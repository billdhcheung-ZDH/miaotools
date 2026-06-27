@echo off
chcp 65001 >nul
title 妙用工具站 - GitHub 部署脚本

echo ============================================
echo   妙用工具站 - 一键部署到 GitHub Pages
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] 检查 Git 环境...
git --version >nul 2>&1
if errorlevel 1 (
    echo ✗ 未检测到 Git，请先安装 Git for Windows
    echo   下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✓ Git 已安装

echo.
echo [2/4] 配置 Git 凭据管理器...
git config credential.helper manager

echo.
echo [3/4] 添加远程仓库...
git remote remove origin 2>nul
git remote add origin "https://github.com/billdhcheung-ZDH/miaotools.git"
echo ✓ 远程仓库已配置: https://github.com/billdhcheung-ZDH/miaotools.git

echo.
echo [4/4] 推送代码到 GitHub...
echo.
echo ⚠️  即将推送代码，可能会弹出浏览器窗口要求登录 GitHub
echo    请在浏览器中完成 GitHub 授权
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo ✗ 推送失败！请检查:
    echo   1. 是否已在 GitHub 创建名为 miaotools 的仓库
    echo   2. GitHub 账号是否已授权
    echo.
    echo 创建仓库步骤:
    echo   1. 打开 https://github.com/new
    echo   2. Repository name 填: miaotools
    echo   3. 选择 Public
    echo   4. 不要勾选任何初始化选项
    echo   5. 点击 Create repository
    echo   6. 重新运行此脚本
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   ✓ 代码推送成功！
echo ============================================
echo.
echo 下一步:
echo   1. 打开 https://github.com/billdhcheung-ZDH/miaotools
echo   2. 点击 Settings 标签
echo   3. 左侧菜单点击 Pages
echo   4. Source 选 Deploy from a branch
echo   5. Branch 选 main，文件夹选 / (root)
echo   6. 点击 Save
echo   7. 等待 1-2 分钟，页面会显示站点地址
echo   8. 在 Custom domain 输入: miaotools.com.cn
echo   9. 点击 Save，勾选 Enforce HTTPS
echo.
pause
