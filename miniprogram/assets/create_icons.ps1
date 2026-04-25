Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap(81,81)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(22,119,255))
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillRectangle($brush,28,18,25,28)
$g.FillRectangle($brush,22,44,37,25)
$bmp.Save("D:\study\python\lingshan-bus\miniprogram\assets\home.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$bmp2 = New-Object System.Drawing.Bitmap(81,81)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.Clear([System.Drawing.Color]::FromArgb(22,119,255))
$brush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g2.FillRectangle($brush2,15,20,51,35)
$g2.FillEllipse($brush2,20,55,12,12)
$g2.FillEllipse($brush2,49,55,12,12)
$bmp2.Save("D:\study\python\lingshan-bus\miniprogram\assets\bus.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()
Write-Host "Icons created!"