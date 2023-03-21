import { queue } from "@/components/queue/queue";
import type { NextApiRequest, NextApiResponse } from "next";
import "@/components/queue/worker";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    queue.add("ping", { message: "Hello World!" });
    return res.status(200).json({ message: "OK" });
  } catch (err: any) {
    console.warn(
      "Error",
      err?.message,
      "response",
      err?.response?.status,
      err?.response?.statusText,
      err?.response?.data
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
