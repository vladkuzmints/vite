import chokidar from 'chokidar'
import { spawn } from 'child_process'

const watcher = chokidar.watch(['../src/**/*', '../src/**/*']);

let server;

watcher.on('ready', () => {
  watcher.on('all', () => {
    if (server) {
      server.kill();
    }

    server = spawn('npm', ['run', 'vite'], {
      stdio: 'inherit',
    });
  });
});