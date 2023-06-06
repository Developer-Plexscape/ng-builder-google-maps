import { BuilderContext, BuilderOutput, createBuilder, Target } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readFile, writeFile } from 'fs';

interface Options extends JsonObject {
  version: number;
  key: string;
  workspaceConfig: string,
  outputPath: string;
}

export default createBuilder<Options>((options: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {

    // create a target for building the app
    const buildTarget = {
      target: 'build',
      project: (context.target as Target).project,
      configuration: options.workspaceConfig || ''
    };

    // get the options of the build target
    const buildOptions = await context.getTargetOptions(buildTarget);

    // start building the app and wait to finish
    const build = await context.scheduleTarget(buildTarget);   
    await build.result;

    // assemble the path of the index.html file
    const outputPath = buildOptions['outputPath'] as string;
    const indexPath = buildOptions['index'] as string;

    readFile(outputPath + indexPath.substring(indexPath.lastIndexOf('/')), (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        reject(err.message);
      } else {
        // Google Maps API versios are n.nn (https://developers.google.com/maps/documentation/javascript/versions#choosing-a-version-number)
        let apiUrl = 'https://maps.googleapis.com/maps/api/js?v=' + options.version.toFixed(2);
        
        if (options.key) {
          apiUrl += '&key=' + options.key;
        }
        
        const content = data.toString().replace('</head>', `<script src="${apiUrl}"></script></head>`);
        
        writeFile(options.outputPath, content, (err: NodeJS.ErrnoException) => {
          if (err) {
            reject(err.message);
          } else {
            context.logger.info('✔ Output file created succesfully!');
            resolve({ success: true });
          }
        });
      }
    });
  })
});
