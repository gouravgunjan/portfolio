#!/bin/bash
find test-results -name "video.webm" -print0 | while IFS= read -r -d '' video_path; do
  test_name=$(echo "$video_path" | sed -e "s|test-results/||" -e "s|/video.webm||")
  mkdir -p "tests/videos/$test_name"
  cp "$video_path" "tests/videos/$test_name/"
done
