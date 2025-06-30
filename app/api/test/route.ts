import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🧪 Testing Supabase connection...");

    // Тест підключення до Supabase
    const { data, error } = await supabase
      .from("regions") // Спробуємо отримати дані з будь-якої таблиці
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      });
    }

    console.log("✅ Supabase connection successful!");
    console.log("Data received:", data);

    return NextResponse.json({
      success: true,
      message: "Supabase connection working!",
      data: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("💥 Test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Connection test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
