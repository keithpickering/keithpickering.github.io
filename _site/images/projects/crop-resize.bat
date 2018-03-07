@echo off
set /p pathName="Enter directory name: " %=%
cd %~dp0\%pathName%

md small
md medium
md large
for %%f in (*.jpg) do (
    "C:\Program Files\ImageMagick-6.9.0-Q16\convert.exe" %%f -strip -resize "120x120^^" -gravity center -crop 120x120+0+0 -quality 40 small/%%f
    "C:\Program Files\ImageMagick-6.9.0-Q16\convert.exe" %%f -strip -resize "320x320^^" -gravity center -crop 320x320+0+0 -quality 80 medium/%%f
    "C:\Program Files\ImageMagick-6.9.0-Q16\convert.exe" %%f -strip -resize "1600x900" -quality 90 large/%%f
)
