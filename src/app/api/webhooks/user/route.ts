import { prisma } from "@/lib/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_SERCRET || "";
interface WebhookEvent {
  type: string;
  data?: {
    id: string;
    first_name: string;
    email_addresses: { email_address: string }[];
    // eslint-disable-next-line
    [key: string]: any | undefined;
  };
}

const handler = async (req: Request) => {
  const payload = await req.json();

  const headersList = headers();

  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid error in svix",
      },
      { status: 400 }
    );
  }

  const evenType = evt.type;
  if (evenType === "user.created" || evenType === "user.updated") {
    if (evt.data) {
      const { id, ...attributes } = evt.data;

      await prisma.user.create({
        data: {
          clerkId: id,
          name: attributes.first_name,
          email: attributes.email_addresses[0].email_address,
        },
      });
    }

    return NextResponse.json(
      { data: "user created successfully in db" },
      { status: 202 }
    );
  }
  return NextResponse.json(
    {
      data: {
        message: "Internal server error",
      },
    },
    { status: 500 }
  );
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
