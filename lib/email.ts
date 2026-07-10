import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRSVPConfirmation({
  to,
  guestName,
  eventTitle,
  eventDate,
  venue,
}: {
  to: string;
  guestName: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
}) {
  try {
    await resend.emails.send({
      from: "Rsvp.ng <onboarding@resend.dev>",
      to,
      subject: `You're confirmed for ${eventTitle}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1A1D3A;">Hi ${guestName},</h2>
          <p>Your RSVP for <strong>${eventTitle}</strong> is confirmed.</p>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</p>
          <p><strong>Venue:</strong> ${venue}</p>
          <p style="color: #6B7280; font-size: 13px; margin-top: 24px;">Sent by Rsvp.ng — Every Event. Perfectly Shared.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    // Don't throw — a failed email shouldn't block the RSVP itself
  }
}
