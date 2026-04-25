Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param($path, $text, $bgColor, $textColor)
    $bmp = New-Object System.Drawing.Bitmap(81,81)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'HighQuality'
    $g.TextRenderingHint = 'AntiAlias'
    
    # Background
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($bgColor))
    $g.FillRectangle($bgBrush, 0, 0, 81, 81)
    
    # Text
    $font = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($textColor))
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = 'Center'
    $sf.LineAlignment = 'Center'
    $rect = New-Object System.Drawing.RectangleF(0, 0, 81, 81)
    $g.DrawString($text, $font, $textBrush, $rect, $sf)
    
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created: $path"
}

Create-Icon "D:\study\python\lingshan-bus\miniprogram\assets\home.png" "🏠" 22,119,255 255,255,255
Create-Icon "D:\study\python\lingshan-bus\miniprogram\assets\home-active.png" "🏠" 22,119,255 255,255,255
Create-Icon "D:\study\python\lingshan-bus\miniprogram\assets\bus.png" "🚌" 22,119,255 255,255,255
Create-Icon "D:\study\python\lingshan-bus\miniprogram\assets\bus-active.png" "🚌" 22,119,255 255,255,255