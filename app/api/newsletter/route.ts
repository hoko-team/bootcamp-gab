import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body)
    return NextResponse.json({ error: "Payload invalide." }, { status: 400 })

  const validatedData = newsletterSchema.safeParse(body)

  if (!validatedData.success)
    return NextResponse.json({ error: "Email invalide." }, { status: 400 })

  return NextResponse.json(
    { error: "Inscription newsletter indisponible." },
    { status: 501 }
  )
}
