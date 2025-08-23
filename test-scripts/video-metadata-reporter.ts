import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { sanitizeForFilename } from './utils.js';

interface VideoManifestEntry {
  sourcePath: string;
  destinationPath: string;
  testTitle: string;
}

class VideoMetadataReporter implements Reporter {
  private results: { test: TestCase, result: TestResult }[] = [];

  onTestEnd(test: TestCase, result: TestResult): void {
    console.log(`[Reporter] Finished test: ${test.title}, Status: ${result.status}`);
    this.results.push({ test, result });
  }

  onEnd(result: FullResult): void {
    console.log(`[Reporter] onEnd called with status: ${result.status}`);
    const videoManifest: VideoManifestEntry[] = [];

    if (result.status === 'passed' || result.status === 'failed' || result.status === 'timedout') {
      console.log(`[Reporter] Processing ${this.results.length} test results.`);
      for (const { test, result: testResult } of this.results) {
        const video = testResult.attachments.find(a => a.name === 'video');
        if (video && video.path) {
          const testTitle = test.titlePath().slice(3).join(' > ');
          const sanitizedTestTitle = sanitizeForFilename(testTitle);
          const destinationDir = `${test.location.file}-videos`;
          const destinationPath = path.join(destinationDir, `${sanitizedTestTitle}.webm`);

          console.log(`[Reporter] Found video for "${test.title}" at: ${video.path}`);
          videoManifest.push({
            sourcePath: video.path,
            destinationPath: destinationPath,
            testTitle: testTitle,
          });
        } else {
          console.log(`[Reporter] No video attachment found for "${test.title}".`);
        }
      }
    }

    fs.writeFileSync('test-scripts/video-manifest.json', JSON.stringify(videoManifest, null, 2));
    console.log('[Reporter] Video manifest saved to test-scripts/video-manifest.json');
  }
}

export default VideoMetadataReporter;
