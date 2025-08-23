const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { execSync } = require('child_process');

const rootDir = __dirname;
const testsDir = path.join(rootDir, 'tests');
const testResultsDir = path.join(rootDir, 'test-results');
const blobReportPath = path.join(rootDir, 'playwright-report', 'results.zip');
const unzippedDir = path.join(testResultsDir, 'unzipped');

/**
 * Sanitizes a string to be used as a valid filename.
 * @param {string} name The string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitizeForFilename(name) {
  return name.replace(/\s/g, '-').replace(/[>\/]/g, '-').toLowerCase();
}

function processBlobReport() {
  if (!fs.existsSync(blobReportPath)) {
    console.log('Blob report (results.zip) not found. Skipping artifact processing.');
    return;
  }

  // Unzip the blob report
  const zip = new AdmZip(blobReportPath);
  zip.extractAllTo(unzippedDir, true);
  console.log(`Extracted ${blobReportPath} to ${unzippedDir}`);

  // Find all the test result JSON files
  const resultFiles = findFilesByExt(unzippedDir, '.json');

  for (const resultFile of resultFiles) {
    const result = JSON.parse(fs.readFileSync(resultFile, 'utf-8'));
    const video = result.attachments?.find(a => a.name === 'video');
    
    if (video && video.path) {
      const specFilePath = path.join(rootDir, result.specFile);
      // Use the full test title path for a unique name
      function sanitizeForFilename(name) {
  // This sanitization is designed to match the key in the videoDescriptions object.
  return name.replace(/\s/g, '-').toLowerCase();
}

function processBlobReport() {
  if (!fs.existsSync(blobReportPath)) {
    console.log('Blob report (results.zip) not found. Skipping artifact processing.');
    return;
  }

  // Unzip the blob report
  const zip = new AdmZip(blobReportPath);
  zip.extractAllTo(unzippedDir, true);
  console.log(`Extracted ${blobReportPath} to ${unzippedDir}`);

  // Find all the test result JSON files
  const resultFiles = findFilesByExt(unzippedDir, '.json');

  for (const resultFile of resultFiles) {
    const resultData = JSON.parse(fs.readFileSync(resultFile, 'utf-8'));
    
    // The result file itself contains suites and tests, find the actual test result
    const findTestResult = (suite) => {
      for (const test of suite.tests) {
        const video = test.results[0]?.attachments?.find(a => a.name === 'video');
        if (video && video.path) {
          const specFilePath = path.join(rootDir, suite.file);
          const testTitle = test.title; // Just the title of the test
          const videoPath = path.join(path.dirname(resultFile), video.path);

          if (fs.existsSync(videoPath)) {
            const videosDirForSpec = `${specFilePath}-videos`;
            if (!fs.existsSync(videosDirForSpec)) {
              fs.mkdirSync(videosDirForSpec, { recursive: true });
            }

            const sanitizedTestTitle = sanitizeForFilename(testTitle);
            const newVideoPath = path.join(videosDirForSpec, `${sanitizedTestTitle}.webm`);

            if (!fs.existsSync(newVideoPath)) {
              fs.copyFileSync(videoPath, newVideoPath);
              console.log(`Copied video for "${testTitle}" to ${newVideoPath}`);
            }
          } else {
            console.warn(`WARNING: Video not found at expected path: ${videoPath}`);
          }
        }
      }
      for (const childSuite of suite.suites) {
        findTestResult(childSuite);
      }
    };

    findTestResult(resultData);
  }
}
      const videoPath = path.join(path.dirname(resultFile), video.path);

      if (fs.existsSync(videoPath)) {
        const videosDirForSpec = `${specFilePath}-videos`;
        if (!fs.existsSync(videosDirForSpec)) {
          fs.mkdirSync(videosDirForSpec, { recursive: true });
        }

        const sanitizedTestTitle = sanitizeForFilename(testTitle);
        const newVideoPath = path.join(videosDirForSpec, `${sanitizedTestTitle}.webm`);

        if (!fs.existsSync(newVideoPath)) {
          fs.copyFileSync(videoPath, newVideoPath);
          console.log(`Copied video for "${testTitle}" to ${newVideoPath}`);
        }
      } else {
        console.warn(`WARNING: Video not found at expected path: ${videoPath}`);
      }
    }
  }
}

function findFilesByExt(dir, ext) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findFilesByExt(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}


async function verifyArtifact(filePath, expectedDescription, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Verifying artifact: ${filePath} (Attempt ${attempt}/${maxRetries})`);
      const command = `node verify-artifact.js "${filePath}" "${expectedDescription}"`;
      const result = execSync(command, { stdio: 'pipe' }).toString().trim();

      if (result === 'PASS') {
        console.log(`Artifact verified successfully: ${filePath}`);
        return; // Success, exit the loop
      } else {
        console.error(`Artifact verification failed for ${path.basename(filePath)}:`);
        console.error(result);
        if (attempt === maxRetries) {
          process.exit(1);
        }
      }
    } catch (error) {
      console.error(`Error verifying artifact ${filePath} on attempt ${attempt}:`, error.stdout?.toString(), error.stderr?.toString());
      if (attempt === maxRetries) {
        process.exit(1);
      }
      console.log('Retrying...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }
  }
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
    } else if (entry.name.endsWith('.spec.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}



async function verifyAllArtifacts() {
  console.log('\nStarting verifyAllArtifacts...');
  const specFiles = findSpecFiles(testsDir);
  console.log(`Found ${specFiles.length} spec files to process.`);

  for (const specFile of specFiles) {
    console.log(`Processing spec file: ${specFile}`);
    const dataFile = `${specFile}.data.json`;
    if (!fs.existsSync(dataFile)) {
      console.warn(`WARNING: Data file not found for ${specFile}. Skipping.`);
      continue;
    }

    try {
      const descriptions = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

      if (descriptions.screenshotDescriptions) {
        const snapshotsDir = `${specFile}-snapshots`;
        console.log(`- Checking for screenshots in: ${snapshotsDir}`);
        if (fs.existsSync(snapshotsDir)) {
          for (const file of fs.readdirSync(snapshotsDir)) {
            if (file.endsWith('.png')) {
              const snapshotName = file.replace(/-chromium-linux.png|-firefox-linux.png|-webkit-linux.png/, '.png');
              const description = descriptions.screenshotDescriptions[snapshotName];
              if (description) {
                await verifyArtifact(path.join(snapshotsDir, file), description);
              }
            }
          }
        } else {
          console.log(`- Snapshot directory not found.`);
        }
      }

      if (descriptions.videoDescriptions) {
        const videosDirForSpec = `${specFile}-videos`;
        console.log(`- Checking for videos in: ${videosDirForSpec}`);
        if (fs.existsSync(videosDirForSpec)) {
          for (const videoFile of fs.readdirSync(videosDirForSpec)) {
            const videoNameWithoutExt = path.basename(videoFile, '.webm');
            for (const testTitle in descriptions.videoDescriptions) {
              if (sanitizeForFilename(testTitle) === videoNameWithoutExt) {
                const description = descriptions.videoDescriptions[testTitle];
                await verifyArtifact(path.join(videosDirForSpec, videoFile), description);
                break;
              }
            }
          }
        } else {
          console.log(`- Video directory not found.`);
        }
      }
    } catch (error) {
      console.warn(`ERROR: Could not process descriptions for ${specFile}:`, error);
    }
  }
  console.log('Finished verifyAllArtifacts.');
}

async function main() {
  processBlobReport();
  await verifyAllArtifacts();
}

main();
