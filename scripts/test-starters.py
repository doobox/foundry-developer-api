#!/usr/bin/env python3
"""Regression tests for tutorial extraction and deterministic ZIP generation."""
import io
import json
from pathlib import Path
import runpy
import unittest
import zipfile

builder = runpy.run_path(str(Path(__file__).with_name("build-starters.py")))
source = (Path(__file__).resolve().parents[1] / "quick-start.md").read_text()


class StarterTests(unittest.TestCase):
    def test_stages_and_archives(self):
        stages = builder["starter_files"](source)
        self.assertNotIn("controls", json.loads(stages["starter"]["manifest.json"]))
        self.assertEqual(len(json.loads(stages["complete"]["manifest.json"])["controls"]), 2)
        self.assertNotIn(b"dropZone", stages["starter"]["part.html"])
        self.assertIn(b'dropZone("content")', stages["complete"]["part.html"])
        for stage, files in stages.items():
            archive = builder["archive"](files)
            self.assertEqual(archive, builder["archive"](files))
            with zipfile.ZipFile(io.BytesIO(archive)) as zipped:
                self.assertIsNone(zipped.testzip())
                self.assertEqual(len(zipped.namelist()), 5)
                outer = json.loads(zipped.read("Callout.foundrydevpack/manifest.json"))
                self.assertEqual(outer["formatVersion"], 2)
                for name, data in files.items():
                    relative = name if name == "manifest.json" else f"Resources/{name}"
                    self.assertEqual(
                        zipped.read(f"Callout.foundrydevpack/Parts/uk.co.example.callout/{relative}"),
                        data,
                    )

    def test_missing_marker_fails(self):
        with self.assertRaises(ValueError):
            builder["starter_files"](source.replace("<!-- starter:part.css -->", ""))

    def test_duplicate_marker_fails(self):
        with self.assertRaises(ValueError):
            builder["starter_files"](source + '\n<!-- starter:part.css -->\n```css\n:instance {}\n```')


if __name__ == "__main__":
    unittest.main()
