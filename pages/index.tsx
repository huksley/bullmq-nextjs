import { useEffect, useState } from "react";

const ping = () => {
  return fetch("/api/ping", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  }).then((res) => res.json());
};

export default function Page() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ntfy.sh/" + process.env.NEXT_PUBLIC_TOPIC_RAND + "/ws"
    );
    socket.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      if (data.event === "message") {
        console.log(data);
        setMessage(data?.message);
      }
    });
    return () => socket.close();
  });

  return (
    <main>
      <h1>Test BullMQ + NextJS</h1>
      <p>
        Press the button below multiple times to get response from the worker. It uses BullMQ
        to process job and ntfy.sh to receive async response in topic{" "}
        {process.env.NEXT_PUBLIC_TOPIC_RAND}.
      </p>

      <p>
        If you change components/queue/worker.ts new worker instance will be created but old
        still continue to exist and process jobs.
      </p>

      <button onClick={() => ping()}>Ping!</button>

      <p>Response: {message}</p>
    </main>
  );
}
