import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readFile, writeFile } from 'fs';

interface Options extends JsonObject {
  version: number;
  key: string;
  inFile: string;
  outFile: string;
}

export default createBuilder<Options>((options: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>((resolve, reject) => {
    readFile(options.inFile, (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        reject(err.message);
      } else {
        let apiUrl = 'https://maps.googleapis.com/maps/api/js?v=' + options.version;
        
        if (options.key) {
          apiUrl += '&key=' + options.key;
        }
        
        const content = data.toString().replace('</head>', `<script src="${apiUrl}"></script></head>`);
        
        writeFile(options.outFile, content, (err: NodeJS.ErrnoException) => {
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
