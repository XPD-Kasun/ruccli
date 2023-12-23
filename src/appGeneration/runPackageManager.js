export default async function runPackageManager(packageManager) {

       const execa = (await import('execa')).execa;
       
       let childProcess = null;

       if (packageManager === 'yarn') {
              childProcess = execa('yarn', ['install'], { stdio: 'inherit' });
       }
       else {
              childProcess = execa('npm', ['install'], { stdio: 'inherit' });
       }

       //childProcess = execa("java")
       
       return childProcess;

}