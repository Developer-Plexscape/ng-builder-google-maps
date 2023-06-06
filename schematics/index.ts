import {
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { readWorkspace, writeWorkspace } from '@schematics/angular/utility';
import { Schema } from './schema';

interface NgAddOptions extends Schema {
  project: string;
}

export const ngAdd =
  (options: NgAddOptions) => async (tree: Tree, _context: SchematicContext) => {
    const workspace = await readWorkspace(tree);
    const project = workspace.projects.get(options.project);

    if (!project) {
      throw new SchematicsException(
        'The specified Angular project is not defined in this workspace.'
      );
    }

    if (project.extensions.projectType !== 'application') {
      throw new SchematicsException(
        `ng-builder-google-maps requires an Angular project type of "application" in angular.json.`
      );
    }

    project.targets.add({
      name: 'google-maps',
      builder: 'ng-builder-google-maps:gmaps',
      options: {}
    });

    await writeWorkspace(tree, workspace);
    return tree;
  };