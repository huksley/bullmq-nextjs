import { Worker } from "bullmq";
import { queue, connection } from "./queue";
import fetch from "node-fetch";

const trace = (worker: Worker, verbose?: boolean) => {
  const log = verbose ? console.info : () => {};
  worker.on("completed", (job) => {
    log("Worker", worker.name, "job", job.id, "completed");
  });
  worker.on("failed", (job, err) => {
    log("Worker", worker.name, "job", job?.id, "failed", err);
  });
  worker.on("error", (err) => {
    log("Worker", worker.name, "error", err);
  });
  worker.on("stalled", (jobId) => {
    log("Worker", worker.name, "job", jobId, "stalled");
  });
  worker.on("active", (job) => {
    log("Worker", worker.name, "job", job.id, "active");
  });
  worker.on("paused", () => {
    log("Worker", worker.name, "paused");
  });
  worker.on("drained", () => {
    log("Worker", worker.name, "drained");
  });
  return worker;
};

queue.getWorkers().then((workers) => {
  console.info(
    "Workers",
    workers.map((w) => w.id + ": " + w.name)
  );
});

const ntfy = (data?: unknown) => {
  fetch("https://ntfy.sh/" + process.env.NEXT_PUBLIC_TOPIC_RAND, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then((res) => {
      console.info("ntfy.sh response", res.status, res.statusText);
    })
    .catch((err) => {
      console.warn("Error", err?.message);
    });
};

trace(
  new Worker(
    queue.name,
    async (job) => {
      // Increment this v.1.0 to v.1.1, etc to see the worker recompile without removing previous worker
      const worker = "Worker v.1.0";
      console.info(worker, "Got job", job.name);
      ntfy({ message: worker + " Got job", job: job.name, data: job.data });
    },
    {
      connection
    }
  )
);
