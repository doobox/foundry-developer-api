#!/usr/bin/env python3
"""Regression tests for tutorial extraction and deterministic ZIP generation."""
import io
from pathlib import Path
import plistlib
import runpy
import unittest
import zipfile

builder = runpy.run_path(str(Path(__file__).with_name("build-starters.py")))
source = (Path(__file__).resolve().parents[1] / "quick-start.md").read_text()


class StarterTests(unittest.TestCase):
    def test_stages_and_archives(self):
        stages = builder["starter_files"](source)
        self.assertNotIn("controls", plistlib.loads(stages["starter"]["Info.plist"]))
        self.assertEqual(len(plistlib.loads(stages["complete"]["Info.plist"])["controls"]), 2)
        self.assertNotIn(b"dropZone", stages["starter"]["part.html"])
        self.assertIn(b'dropZone("content")', stages["complete"]["part.html"])
        for stage, files in stages.items():
            archive = builder["archive"](files)
            self.assertEqual(archive, builder["archive"](files))
            with zipfile.ZipFile(io.BytesIO(archive)) as zipped:
                self.assertIsNone(zipped.testzip())
                self.assertEqual(len(zipped.namelist()), 5)
                outer = plistlib.loads(zipped.read("Callout.foundrydevpack/Info.plist"))
                self.assertEqual(outer["formatVersion"], 2)
                for name, data in files.items():
                    relative = name if name == "Info.plist" else f"Resources/{name}"
                    self.assertEqual(
                        zipped.read(f"Callout.foundrydevpack/Parts/uk.co.example.callout/{relative}"),
                        data,
                    )

    def test_missing_marker_fails(self):
        with self.assertRaises(ValueError):
            builder["starter_files"](source.replace("<!-- starter:icon.svg -->", ""))

    def test_duplicate_marker_fails(self):
        with self.assertRaises(ValueError):
            builder["starter_files"](source + '\n<!-- starter:icon.svg -->\n```svg\n<svg/>\n```')


if __name__ == "__main__":
    unittest.main()
