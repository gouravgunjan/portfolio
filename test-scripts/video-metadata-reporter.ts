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
    // Store all test results to process them at the end.
    this.results.push({ test, result });
  }

  onEnd(result: FullResult): void {
    const videoMetadata: VideoMetadata[] = [];

    if (result.status === 'passed' || result.status === 'failed') {
      for (const { test, result: testResult } of this.results) {
        const video = testResult.attachments.find(a => a.name === 'video');
        if (video && video.path) {
          videoMetadata.push({
            videoPath: video.path,
            specFilePath: test.location.file,
            testTitle: test.titlePath().slice(1).join(' > '),
          });
        }
      }
    }

    // Write the collected metadata to a file.
    fs.writeFileSync('video-metadata.json', JSON.stringify(videoMetadata, null, 2));
    console.log('Video metadata saved to video-metadata.json');
  }
}

export default VideoMetadataReporter;
