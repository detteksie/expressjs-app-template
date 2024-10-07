import { ExecException, exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export const sequelizeSetup = async () => {
  try {
    const { stdout, stderr } = await execPromise('npm run test:before');
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  } catch (err) {
    console.error(`error: ${(err as ExecException).message}`);
    throw err;
  }
};

export const sequelizeTeardown = async () => {
  try {
    const { stdout, stderr } = await execPromise('npm run test:after');
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  } catch (err) {
    console.error(`error: ${(err as ExecException).message}`);
    throw err;
  }
};
