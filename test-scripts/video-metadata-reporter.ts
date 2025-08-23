import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface VideoMetadata {
  videoPath: string;
  specFilePath: string;
  testTitle: string;
}

class VideoMetadataReporter implements Reporter {
  private results: { test: TestCase, result: TestResult }[] = [];

  onTestEnd(test: TestCase, result: TestResult): void {
    console.log(`[Reporter] Finished test: ${test.title}, Status: ${result.status}`);
    // Store all test results to process them at the end.
    this.results.push({ test, result });
  }

  onEnd(result: FullResult): void {
    console.log(`[Reporter] onEnd called with status: ${result.status}`);
    const videoMetadata: VideoMetadata[] = [];

    if (result.status === 'passed' || result.status === 'failed' || result.status === 'timedout') {
      console.log(`[Reporter] Processing ${this.results.length} test results.`);
      for (const { test, result: testResult } of this.results) {
        console.log(`[Reporter] Checking test: ${test.title}`);
        const video = testResult.attachments.find(a => a.name === 'video');
        if (video && video.path) {
          console.log(`[Reporter]   Found video for "${test.title}" at: ${video.path}`);
          videoMetadata.push({
            videoPath: video.path,
            specFilePath: test.location.file,
            testTitle: test.titlePath().slice(1).join(' > '),
          });
        } else {
          console.log(`[Reporter]   No video attachment found for "${test.title}".`);
        }
      }
    }

    // Write the collected metadata to a file.
    fs.writeFileSync('video-metadata.json', JSON.stringify(videoMetadata, null, 2));
    console.log('[Reporter] Video metadata saved to video-metadata.json');
  }
}

export default VideoMetadataReporter;