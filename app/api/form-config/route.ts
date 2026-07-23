import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

interface SelectOption {
  label: string;
  value: string;
}

interface FormConfig {
  industries: SelectOption[];
  companySizes: SelectOption[];
  investmentAmounts: SelectOption[];
}

function isOptionList(value: unknown): value is SelectOption[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as SelectOption).label === "string" &&
        typeof (item as SelectOption).value === "string"
    )
  );
}

function isValidFormConfig(value: unknown): value is FormConfig {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const config = value as Partial<FormConfig>;

  return (
    isOptionList(config.industries) &&
    isOptionList(config.companySizes) &&
    isOptionList(config.investmentAmounts)
  );
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "config", "form-options.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContent) as unknown;

    if (!isValidFormConfig(parsed)) {
      return NextResponse.json(
        { error: "Invalid form configuration format." },
        {
          status: 500,
          headers: {
            "Cache-Control": "public, max-age=3600",
          },
        }
      );
    }

    return NextResponse.json(parsed, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[form-config] Failed to read form config:", error);
    return NextResponse.json(
      { error: "Could not load form configuration." },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }
}
