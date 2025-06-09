// app/api/analyze/route.ts
import { NextResponse, NextRequest } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { getAuth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

export const runtime = "nodejs"; // must be Node so we can use pdf-parse & mammoth

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  // 1) Authenticate
  const { userId: clerkId } = getAuth(request);
  if (!clerkId) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  // 2) Pull out the file + agent from the multipart form
  const form = await request.formData();
  const file = form.get("file") as globalThis.File | null;
  const agent = (form.get("agent") as string | null) || "general";
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // 3) Validate extension
  const name = file.name;
  const ext = name.split(".").pop()?.toLowerCase();
  if (!["pdf", "doc", "docx"].includes(ext || "")) {
    return NextResponse.json(
      { error: "Unsupported file type; only PDF/DOC/DOCX allowed" },
      { status: 400 }
    );
  }

  // 4) Extract raw text
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  let contractText: string;
  if (ext === "pdf") {
    const data = await pdfParse(buffer);
    contractText = data.text;
  } else {
    const { value } = await mammoth.extractRawText({ buffer });
    contractText = value;
  }

  // 5) Call your Convex action
  try {
    const result = await convex.action(
      api.contractAnalyzeGemini.analyzeContract,
      {
        contractText,
        contractType: agent,
        language: "en",
        userId: clerkId,
      }
    );
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Convex analyzeContract error:", err);
    return NextResponse.json(
      { error: err.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
