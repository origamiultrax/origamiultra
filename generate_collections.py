#!/usr/bin/env python3
import json
import os
from pathlib import Path

ROOT = Path(__file__).parent
PICS_DIR = ROOT / "MONA PICTURES"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

def is_image_file(p: Path) -> bool:
    return p.is_file() and p.suffix.lower() in IMAGE_EXTS and p.name != ".DS_Store"

def pretty_title(folder_name: str) -> str:
    # Default behavior: keep exact folder name.
    # If you want basic prettification later, uncomment the next line:
    # return folder_name.replace("_", " ").strip()
    return folder_name

def main():
    if not PICS_DIR.exists():
        raise SystemExit(f"Missing folder: {PICS_DIR}")

    collections = []

    # Only direct subfolders of "MONA PICTURES"
    for folder in sorted([p for p in PICS_DIR.iterdir() if p.is_dir()], key=lambda p: p.name.lower()):
        images = sorted(
            [p for p in folder.iterdir() if is_image_file(p)],
            key=lambda p: p.name.lower()
        )

        if not images:
            continue

        rel_images = [str(Path("MONA PICTURES") / folder.name / img.name) for img in images]
        cover = rel_images[0]  # first alphabetically

        collections.append({
            "id": folder.name,                 # used in URL query param
            "title": pretty_title(folder.name),
            "count": len(rel_images),
            "cover": cover,
            "images": rel_images
        })

    out = {"collections": collections}
    out_path = ROOT / "collections.json"
    out_path.write_text(json.dumps(out, indent=2), encoding="utf-8")
    print(f"Wrote {out_path} with {len(collections)} collections.")

if __name__ == "__main__":
    main()
