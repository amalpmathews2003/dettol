import { spawn } from 'child_process';
import path from 'path';
const exePath = path.join(__dirname, './engine.exe');

export function find_node_modules(setItems: (items: string[]) => void, path: string) {
  return new Promise<string[]>((resolve, reject) => {
    const paths: string[] = [];
    const process = spawn(exePath, [path, 'find'], { shell: true });
    process.stdout.on('data', function (data) {
      if (data.toString().includes('\n')) {
        const split = data.toString().split('\n');
        split.forEach((item: string) => {
          if (item) {
            paths.push(item);
          }
        });
      } else {
        paths.push(data.toString());
      }
      setItems(paths);
    });
    process.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
      reject(data.toString());
    });
    process.on('exit', function (code) {
      console.log('child process exited with code ' + code?.toString());
      resolve(paths);
    });
  });
}

export function delete_node_module(path: string) {
  return new Promise((resolve, reject) => {
    const process = spawn(exePath, [path, 'delete'], { shell: true });
    process.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
    });
    process.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
      reject(data.toString());
    });
    process.on('exit', function (code) {
      console.log('child process exited with code ' + code?.toString());
      resolve(true);
    });
  })
}