import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, subject, formspreeEndpoint: overrideEndpoint } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // 1. Save inquiry into SQLite database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name ? String(name).trim() : "Anonymous",
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : null,
        company: company ? String(company).trim() : null,
        subject: subject ? String(subject).trim() : null,
        message: String(message).trim(),
        status: "NEW",
      },
    });

    // 2. Optionally forward to Formspree if configured
    let forwardedToFormspree = false;
    const formspreeEndpoint =
      overrideEndpoint ||
      process.env.FORMSPREE_ENDPOINT ||
      (process.env.FORMSPREE_ID ? `https://formspree.io/f/${process.env.FORMSPREE_ID}` : null) ||
      (process.env.NEXT_PUBLIC_FORMSPREE_ID ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}` : null);

    if (formspreeEndpoint) {
      try {
        const formspreeRes = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone,
            company: inquiry.company,
            message: inquiry.message,
            inquiryId: inquiry.id,
          }),
        });

        if (formspreeRes.ok) {
          forwardedToFormspree = true;
        } else {
          console.warn("Formspree forward responded with status:", formspreeRes.status);
        }
      } catch (fErr) {
        console.error("Failed to forward contact submission to Formspree:", fErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
      forwardedToFormspree,
    }, { status: 201 });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Internal server error while saving contact form." },
      { status: 500 }
    );
  }
}
