import { ExecException, exec } from 'child_process';
import util from 'util';

import { Config } from 'jest';

import { mongodbTeardown } from './mongodb-setup';

const execPromise = util.promisify(exec);

async function globalTeardown(_globalConfig: Config, _projectConfig: Config) {
  try {
    const { stdout, stderr } = await execPromise('npm run test:after');
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    await mongodbTeardown();
  } catch (err) {
    if (err) {
      console.error(`error: ${(err as ExecException).message}`);
      throw err;
    }
  }
}

export default globalTeardown;
