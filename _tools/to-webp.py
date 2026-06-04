#!/usr/bin/env python3
# Convierte los PNG de _tools/_out/ a WebP optimizado.
# Uso: python3 _tools/to-webp.py [calidad]   (default 82)
import sys, glob, os
from PIL import Image

q = int(sys.argv[1]) if len(sys.argv) > 1 else 82
root = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(root, "_out")
for png in sorted(glob.glob(os.path.join(out, "*.png"))):
    webp = png[:-4] + ".webp"
    im = Image.open(png).convert("RGB")
    im.save(webp, "WEBP", quality=q, method=6)
    print(f"WEBP {os.path.basename(webp)}  {os.path.getsize(webp)//1024} KB  {im.size[0]}x{im.size[1]}")
