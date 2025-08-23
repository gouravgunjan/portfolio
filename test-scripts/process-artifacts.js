const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { sanitizeForFilename } = require('./utils');

const rootDir = path.join(__dirname, '..');
const testsDir = path.join(rootDir, 'tests');
const videoMetadataPath = path.join(__dirname, 'video-metadata.json');

function processVideoArtifacts() {
  if (!fs.existsSync(videoMetadataPath)) {
    console.log('Video metadata file not found. Skipping video processing.');
    return;
  }

  const videoMetadata = JSON.parse(fs.readFileSync(videoMetadataPath, 'utf-8'));

  for (const videoData of videoMetadata) {
    const localVideoPath = path.join(rootDir, videoData.videoPath.replace('/app/', ''));

    if (fs.existsSync(localVideoPath)) {
      const specFilePath = path.join(rootDir, videoData.specFilePath.replace('/app/', ''));
      const videosDirForSpec = `${specFilePath}-videos`;

      if (!fs.existsSync(videosDirForSpec)) {
        fs.mkdirSync(videosDirForSpec, { recursive: true });
      }

      const newVideoPath = path.join(videosDirForSpec, `${videoData.sanitizedTestTitle}.webm`);

      if (!fs.existsSync(newVideoPath)) {
        fs.copyFileSync(localVideoPath, newVideoPath);
        console.log(`Copied video for "${videoData.testTitle}" to ${newVideoPath}`);
      }
    } else {
      console.warn(`WARNING: Video not found at expected local path: ${localVideoPath}`);
    }
  }
}

async function verifyArtifact(filePath, expectedDescription, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Verifying artifact: ${filePath} (Attempt ${attempt}/${maxRetries})`);
      const command = `node ${path.join(__dirname, 'verify-artifact.js')} "${filePath}" "${expectedDescription}"`;
      const result = execSync(command, { stdio: 'pipe' }).toString().trim();

      if (result === 'PASS') {
        console.log(`Artifact verified successfully: ${filePath}`);
        return true;
      }
      else {
        console.error(`Artifact verification failed for ${path.basename(filePath)}:`);
        console.error(result);
        if (attempt === maxRetries) {
          return false;
        }
      }
    }
    catch (error) {
      console.error(`Error verifying artifact ${filePath} on attempt ${attempt}:`, error.stdout?.toString(), error.stderr?.toString());
      if (attempt === maxRetries) {
        return false;
      }
      console.log('Retrying...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return false;
}

function findSpecFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.endsWith('-snapshots') && !entry.name.endsWith('-videos')) {
        files = files.concat(findSpecFiles(fullPath));
      }
    }
    else if (entry.name.endsWith('.spec.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function verifyAllArtifacts() {
  console.log('\nStarting verifyAllArtifacts...');
  const specFiles = findSpecFiles(testsDir);
  let allVerified = true;

  for (const specFile of specFiles) {
    const dataFile = `${specFile}.data.json`;
    if (!fs.existsSync(dataFile)) continue;

    const descriptions = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    const describedVideos = new Set(Object.keys(descriptions.videoDescriptions || {}));

    const videosDir = `${specFile}-videos`;
    if (fs.existsSync(videosDir)) {
      for (const videoFile of fs.readdirSync(videosDir)) {
        const videoName = path.basename(videoFile, '.webm');
        let foundDescription = false;
        for (const testTitle in descriptions.videoDescriptions) {
          if (sanitizeForFilename(testTitle) === videoName) {
            const description = descriptions.videoDescriptions[testTitle];
            if (!await verifyArtifact(path.join(videosDir, videoFile), description)) {
              allVerified = false;
            }
            describedVideos.delete(testTitle);
            foundDescription = true;
            break;
          }
        }
        if (!foundDescription) {
          console.error(`ERROR: Video artifact "${videoFile}" was found but has no corresponding description in ${dataFile}.`);
          allVerified = false;
        }
      }
    }
    
    if (describedVideos.size > 0) {
        console.error(`ERROR: The following video descriptions in ${dataFile} did not have a matching video artifact:`);
        for(const title of describedVideos) {
            console.error(`- "${title}"`);
        }
        allVerified = false;
    }
  }

  if (!allVerified) {
    console.error('\nArtifact verification failed.');
    process.exit(1);
  } else {
    console.log('\nAll artifacts verified successfully.');
  }
}

async function main() {
  processVideoArtifacts();
  await verifyAllArtifacts();
}

main();
