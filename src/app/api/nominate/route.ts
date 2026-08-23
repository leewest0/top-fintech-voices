import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  isHoneypotTripped,
  nominationHtml,
  nominationSubject,
  nominationText,
  parseNomination,
} from "@/lib/nomination";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const input = payload as Record<string, unknown>;

  // A bot filled the field people never see. Answer as though it worked, so it
  // learns nothing, and send nothing.
  if (isHoneypotTripped(input)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = parseNomination(input);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: "Some details need fixing.", fields: parsed.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOMINATIONS_TO_EMAIL ?? process.env.ORDER_TO_EMAIL ?? site.email;
  const from = process.env.ORDER_FROM_EMAIL;

  // Until the key and sender are configured this cannot be delivered. Say so
  // rather than accepting a nomination and dropping it on the floor.
  if (!apiKey || !from) {
    console.error(
      "Nomination received but not sent: %s is not set.",
      !apiKey ? "RESEND_API_KEY" : "ORDER_FROM_EMAIL",
    );
    return NextResponse.json(
      { error: "Nominations aren't switched on yet.", fallbackEmail: to },
      { status: 503 },
    );
  }

  const { nomination } = parsed;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: nomination.yourEmail,
      subject: nominationSubject(nomination),
      text: nominationText(nomination),
      html: nominationHtml(nomination),
    });

    if (error) {
      console.error("Resend rejected the nomination email:", error);
      return NextResponse.json(
        { error: "We couldn't send that just now.", fallbackEmail: to },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("Nomination email failed:", cause);
    return NextResponse.json(
      { error: "We couldn't send that just now.", fallbackEmail: to },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
