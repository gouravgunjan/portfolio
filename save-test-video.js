const fs = require('fs');
const path = require('path');

const testResultsDir = path.join(__dirname, 'test-results');
const videosDir = path.join(__dirname, 'tests', 'videos');

if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

fs.readdirSync(testResultsDir).forEach(file => {
  const testResultPath = path.join(testResultsDir, file);
  if (fs.statSync(testResultPath).isDirectory()) {
    const videoPath = path.join(testResultPath, 'video.webm');
    if (fs.existsSync(videoPath)) {
      const testName = file.replace(/-chromium|-firefox|-webkit/, '');
      const newVideoPath = path.join(videosDir, `${testName}.webm`);
      if (!fs.existsSync(newVideoPath)) {
        fs.copyFileSync(videoPath, newVideoPath);
      }
    }
  }
});
