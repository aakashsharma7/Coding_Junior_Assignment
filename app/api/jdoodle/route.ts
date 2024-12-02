import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { script, language } = await request.json();

    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "API credentials not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.jdoodle.com/v1/execute",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        script,
        language,
        versionIndex: "0",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("JDoodle API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      return NextResponse.json(
        { error: `API request failed: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.error) {
      console.error("JDoodle Execution Error:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ output: data.output });
  } catch (error) {
    console.error("Detailed Code Execution Error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });

    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    );
  }
}


