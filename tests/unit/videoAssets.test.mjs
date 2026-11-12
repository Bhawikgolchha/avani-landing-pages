import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const PROJECT_ROOT = path.resolve(".");
const VIDEOS_DIR = path.join(PROJECT_ROOT, "public/assets/videos");
const IMAGES_DIR = path.join(PROJECT_ROOT, "public/assets/images");

test("M2 Video Asset Integrity: Canopy Bioluminescent Loop exists and meets constraints", () => {
  const filePath = path.join(VIDEOS_DIR, "canopy_bioluminescent_loop.mp4");
  assert.ok(fs.existsSync(filePath), "canopy_bioluminescent_loop.mp4 must exist");

  const stat = fs.statSync(filePath);
  assert.ok(stat.size > 500_000, `Video file size (${stat.size} bytes) must be substantial (>500KB)`);
  assert.ok(stat.size < 10_000_000, `Video file size (${stat.size} bytes) must be < 10MB`);

  // Verify MP4 header box (ftyp)
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(16);
  fs.readSync(fd, buffer, 0, 16, 0);
  fs.closeSync(fd);
  const boxType = buffer.toString("latin1", 4, 8);
  assert.strictEqual(boxType, "ftyp", "Must have valid ISO base media file format ftyp atom");

  // ffprobe validation
  const probeOutput = execSync(
    `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`,
    { encoding: "utf-8" }
  );
  const data = JSON.parse(probeOutput);
  const videoStream = data.streams.find((s) => s.codec_type === "video");

  assert.ok(videoStream, "Must contain a video stream");
  assert.strictEqual(videoStream.codec_name, "h264", "Must be encoded with H.264 codec");
  assert.strictEqual(videoStream.width, 1920, "Width must be 1920");
  assert.strictEqual(videoStream.height, 1080, "Height must be 1080");
  assert.strictEqual(videoStream.pix_fmt, "yuv420p", "Pixel format must be yuv420p for broad browser support");

  const duration = parseFloat(data.format.duration);
  assert.ok(duration >= 4.0 && duration <= 8.0, `Duration (${duration}s) must be between 4s and 8s`);
});

test("M2 Video Asset Integrity: Biosphere Telemetry Loop exists and meets constraints", () => {
  const filePath = path.join(VIDEOS_DIR, "biosphere_telemetry_loop.mp4");
  assert.ok(fs.existsSync(filePath), "biosphere_telemetry_loop.mp4 must exist");

  const stat = fs.statSync(filePath);
  assert.ok(stat.size > 500_000, `Video file size (${stat.size} bytes) must be substantial (>500KB)`);
  assert.ok(stat.size < 10_000_000, `Video file size (${stat.size} bytes) must be < 10MB`);

  // Verify MP4 header box (ftyp)
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(16);
  fs.readSync(fd, buffer, 0, 16, 0);
  fs.closeSync(fd);
  const boxType = buffer.toString("latin1", 4, 8);
  assert.strictEqual(boxType, "ftyp", "Must have valid ISO base media file format ftyp atom");

  // ffprobe validation
  const probeOutput = execSync(
    `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`,
    { encoding: "utf-8" }
  );
  const data = JSON.parse(probeOutput);
  const videoStream = data.streams.find((s) => s.codec_type === "video");

  assert.ok(videoStream, "Must contain a video stream");
  assert.strictEqual(videoStream.codec_name, "h264", "Must be encoded with H.264 codec");
  assert.strictEqual(videoStream.width, 1920, "Width must be 1920");
  assert.strictEqual(videoStream.height, 1080, "Height must be 1080");
  assert.strictEqual(videoStream.pix_fmt, "yuv420p", "Pixel format must be yuv420p for broad browser support");

  const duration = parseFloat(data.format.duration);
  assert.ok(duration >= 4.0 && duration <= 8.0, `Duration (${duration}s) must be between 4s and 8s`);
});

test("M2 Poster Fallbacks: WebP poster images exist in public assets", () => {
  const canopyPoster = path.join(IMAGES_DIR, "hero_nature_canopy.webp");
  const biospherePoster = path.join(IMAGES_DIR, "hero_ecotech_globe.webp");
  const canopyVideoPoster = path.join(VIDEOS_DIR, "canopy_poster.webp");
  const biosphereVideoPoster = path.join(VIDEOS_DIR, "biosphere_poster.webp");

  assert.ok(fs.existsSync(canopyPoster), "hero_nature_canopy.webp must exist");
  assert.ok(fs.statSync(canopyPoster).size > 50_000, "Canopy poster must be non-empty");

  assert.ok(fs.existsSync(biospherePoster), "hero_ecotech_globe.webp must exist");
  assert.ok(fs.statSync(biospherePoster).size > 50_000, "Biosphere poster must be non-empty");

  assert.ok(fs.existsSync(canopyVideoPoster), "canopy_poster.webp must exist in videos directory");
  assert.ok(fs.existsSync(biosphereVideoPoster), "biosphere_poster.webp must exist in videos directory");
});
