"""Generate colorful tab bar icons for lingshan-bus.
Each icon has multiple colors - not monochrome silhouettes."""
from PIL import Image, ImageDraw
import os

SIZE = 81
OUT = os.path.join(os.path.dirname(__file__), "miniprogram", "images")
TRANSPARENT = (0, 0, 0, 0)
WHITE = (255, 255, 255, 255)
# Color palette
RED = (228, 57, 57, 255)
BROWN = (139, 90, 43, 255)
ORANGE = (255, 165, 0, 255)
DOOR_COLOR = (92, 60, 30, 255)
BUS_BLUE = (22, 119, 255, 255)
BUS_LIGHT = (135, 206, 250, 255)
WHEEL_GRAY = (60, 60, 60, 255)
MESSAGE_BLUE = (66, 133, 244, 255)
MESSAGE_GREEN = (52, 168, 83, 255)
ABOUT_BLUE = (22, 119, 255, 255)
GRAY_BG = (230, 230, 230, 255)


def mk():
    img = Image.new("RGBA", (SIZE, SIZE), TRANSPARENT)
    return img, ImageDraw.Draw(img)


def circle(d, cx, cy, r, fill):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)


def rect(d, x1, y1, x2, y2, fill):
    d.rectangle([x1, y1, x2, y2], fill=fill)


def roundrect(d, x1, y1, x2, y2, r, fill):
    d.rounded_rectangle([x1, y1, x2, y2], radius=r, fill=fill)


# ---- HOME ICON ----
def build_home():
    img, d = mk()
    # Red roof
    d.polygon([(40, 4), (6, 36), (74, 36)], fill=RED)
    # Brown wall
    rect(d, 14, 35, 66, 72, BROWN)
    # Darker door
    rect(d, 30, 44, 50, 63, DOOR_COLOR)
    # Door handle
    circle(d, 46, 54, 2, WHITE)
    # Windows (light blue glass)
    for x in [18, 52]:
        d.rounded_rectangle([x, 40, x + 10, 50], radius=2, fill=(173, 216, 230, 255))
        d.rounded_rectangle([x, 40, x + 10, 50], radius=2, outline=WHITE, width=1)
    # Door arch (lighter brown)
    d.arc([30, 38, 50, 52], 180, 0, fill=ORANGE, width=2)
    return img


# ---- ROUTE ICON ----
def build_route():
    img, d = mk()
    # Road background
    rect(d, 0, 60, 81, 81, (80, 80, 80, 255))
    # Road stripe
    for sx in [10, 30, 50, 70]:
        rect(d, sx, 68, sx + 8, 72, WHITE)
    # Bus body
    roundrect(d, 10, 22, 70, 60, 8, BUS_BLUE)
    # Windows (light blue)
    for wx in [(16, 28, 28, 42), (31, 28, 49, 42), (52, 28, 64, 42)]:
        d.rounded_rectangle(wx, radius=3, fill=BUS_LIGHT)
    # Wheels
    circle(d, 24, 62, 8, WHEEL_GRAY)
    circle(d, 56, 62, 8, WHEEL_GRAY)
    # Wheel hubs
    circle(d, 24, 62, 3, WHITE)
    circle(d, 56, 62, 3, WHITE)
    return img


# ---- MESSAGE ICON ----
def build_message():
    img, d = mk()
    # Chat bubble
    roundrect(d, 8, 10, 72, 50, 12, MESSAGE_GREEN)
    # Tail
    d.polygon([(6, 46), (10, 74), (34, 46)], fill=MESSAGE_GREEN)
    # Speech lines inside
    for y in [22, 34]:
        roundrect(d, 20, y, 60, y + 6, 3, WHITE)
    return img


# ---- ABOUT ICON ----
def build_about():
    img, d = mk()
    # Circle background
    circle(d, 40, 40, 32, ABOUT_BLUE)
    # "i" stem
    roundrect(d, 36, 44, 44, 60, 3, WHITE)
    # "i" dot
    circle(d, 40, 26, 5, WHITE)
    return img


# ---- MUTED VERSIONS (unselected state) ----
def desaturate(img):
    """Slightly desaturate and dim for unselected tab state."""
    arr = img.copy()
    pixels = arr.load()
    for y in range(SIZE):
        for x in range(SIZE):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Convert to grayscale-ish, keep some color
                gray = int(0.5 * r + 0.3 * g + 0.2 * b)
                # Blend: 60% gray + 40% original
                nr = int(gray * 0.6 + r * 0.4)
                ng = int(gray * 0.6 + g * 0.4)
                nb = int(gray * 0.6 + b * 0.4)
                pixels[x, y] = (nr, ng, nb, a)
    return arr


def main():
    os.makedirs(OUT, exist_ok=True)
    print("Generating colorful icons...")

    builders = [
        ("icon_home", build_home),
        ("icon_route", build_route),
        ("icon_message", build_message),
        ("icon_about", build_about),
    ]

    for name, fn in builders:
        # Unselected = muted, selected = full color
        colorful = fn()
        muted = desaturate(fn())
        muted.save(os.path.join(OUT, f"{name}.png"))
        colorful.save(os.path.join(OUT, f"{name}_active.png"))
        print(f"  OK {name}")

    print("Done!")


if __name__ == "__main__":
    main()
