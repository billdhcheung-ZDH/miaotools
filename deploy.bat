@echo off
chcp 936 >nul 2>&1
title Miaotools Deploy

echo ============================================
echo   Miaotools - Deploy to GitHub Pages
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git not found. Install from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo [OK] Git found

echo.
echo [2/4] Configuring credentials...
git config credential.helper manager

echo.
echo [3/4] Setting remote repository...
git remote remove origin 2>nul
git remote add origin "https://github.com/billdhcheung-ZDH/miaotools.git"
echo [OK] Remote set to: https://github.com/billdhcheung-ZDH/miaotools.git

echo.
echo [4/4] Pushing code to GitHub...
echo.
echo !!! A browser window may pop up for GitHub login.
echo !!! Please authorize in the browser.
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo [FAILED] Push failed! Check:
    echo   1. Did you create repo 'miaotools' on GitHub?
    echo   2. Is your GitHub account authorized?
    echo.
    echo To create repo:
    echo   1. Open https://github.com/new
    echo   2. Repository name: miaotools
    echo   3. Select Public
    echo   4. Do NOT check any options (no README, no .gitignore)
    echo   5. Click Create repository
    echo   6. Run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   [SUCCESS] Code pushed to GitHub!
echo ============================================
echo.
echo Next steps:
echo   1. Open https://github.com/billdhcheung-ZDH/miaotools
echo   2. Click Settings tab
echo   3. Click Pages (left sidebar)
echo   4. Source = Deploy from a branch
echo   5. Branch = main, Folder = / (root)
echo   6. Click Save
echo   7. Wait 1-2 minutes for site URL to appear
echo   8. Custom domain: miaotools.com.cn
echo   9. Click Save, check Enforce HTTPS
echo.
pause
