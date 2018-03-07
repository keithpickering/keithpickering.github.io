@echo off
md small
md medium
md large
for %%f in (*.jpg) do (
    "C:\Program Files\ImageMagick-6.8.9-Q16\convert.exe" %%f -resize "120x120^^" -gravity center -crop 120x120+0+0 -quality 40 small/%%f
    "C:\Program Files\ImageMagick-6.8.9-Q16\convert.exe" %%f -resize "360x360^^" -gravity center -crop 360x360+0+0 -quality 80 medium/%%f
    "C:\Program Files\ImageMagick-6.8.9-Q16\convert.exe" %%f -resize "1600x900" -quality 90 large/%%f
)
