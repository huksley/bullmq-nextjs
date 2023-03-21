# BullMQ + NextJS

Bug: : Next.JS code recompilation with dev server results in outdated workers

See issue: https://github.com/taskforcesh/bullmq/issues/1720

## Using

1. git clone
2. nvm use 16
3. npm install
4. Start redis server
5. npm run dev
6. Press ping button at http://localhost:3000
7. Change code in components/queue/worker.ts (for example increment worker version)
8. Replies come from old worker code (and sometimes from new)
