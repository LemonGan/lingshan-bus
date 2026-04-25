@echo off
cd /d D:\study\python\lingshan-bus\miniprogram\assets

REM Create simple blue home icon (home.png)
echo Creating home.png...
powershell -Command "$bmp=New-Object System.Drawing.Bitmap(81,81); $g=[System.Drawing.Graphics]::FromImage($bmp); $g.Clear([System.Drawing.Color]::FromArgb(22,119,255)); $brush=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White); $g.FillRectangle($brush,28,18,25,28); $g.FillRectangle($brush,22,44,37,25); $bmp.Save('D:\study\python\lingshan-bus\miniprogram\assets\home.png'); $bmp.Dispose()"

REM Create bus icon (bus.png)
echo Creating bus.png...
powershell -Command "$bmp=New-Object System.Drawing.Bitmap(81,81); $g=[System.Drawing.Graphics]::FromImage($bmp); $g.Clear([System.Drawing.Color]::FromArgb(22,119,255)); $brush=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White); $g.FillRectangle($brush,15,20,51,35); $g.FillEllipse($brush,20,55,12,12); $g.FillEllipse($brush,49,55,12,12); $bmp.Save('D:\study\python\lingshan-bus\miniprogram\assets\bus.png'); $bmp.Dispose()"

echo Done!