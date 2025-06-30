import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postcode = searchParams.get("code");

    if (!postcode) {
      return NextResponse.json(
        {
          success: false,
          error: "Postcode is required",
        },
        { status: 400 }
      );
    }

    // Clean postcode format
    const cleanPostcode = postcode.trim().toUpperCase().replace(/\s+/g, " ");

    // Get postcode info
    const { data: postcodeData, error: postcodeError } = await supabase
      .from("postcodes")
      .select("*")
      .eq("postcode", cleanPostcode)
      .single();

    if (postcodeError || !postcodeData) {
      return NextResponse.json(
        {
          success: false,
          error: "Postcode not found",
        },
        { status: 404 }
      );
    }

    // Get recent sales in this postcode
    const { data: recentSales, error: salesError } = await supabase
      .from("properties")
      .select("*")
      .eq("postcode", cleanPostcode)
      .order("sale_date", { ascending: false })
      .limit(10);

    // Get price history (group by month)
    const { data: priceHistory, error: historyError } = await supabase
      .from("properties")
      .select("price, sale_date")
      .eq("postcode", cleanPostcode)
      .order("sale_date", { ascending: true });

    // Calculate statistics
    const prices = recentSales?.map((sale) => sale.price) || [];
    const avgPrice =
      prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    // Group by property type
    const byPropertyType =
      recentSales?.reduce((acc: any, sale) => {
        const type = sale.property_type;
        if (!acc[type]) {
          acc[type] = {
            count: 0,
            averagePrice: 0,
            prices: [],
          };
        }
        acc[type].count++;
        acc[type].prices.push(sale.price);
        acc[type].averagePrice =
          acc[type].prices.reduce((a: number, b: number) => a + b, 0) /
          acc[type].prices.length;
        return acc;
      }, {}) || {};

    return NextResponse.json({
      success: true,
      data: {
        postcode: {
          code: postcodeData.postcode,
          district: postcodeData.district,
          city: postcodeData.city,
          region: postcodeData.region,
          coordinates: postcodeData.coordinates,
          averagePrice: postcodeData.average_price,
          propertyCount: postcodeData.property_count,
        },
        statistics: {
          averagePrice: Math.round(avgPrice),
          minPrice,
          maxPrice,
          totalSales: recentSales?.length || 0,
          byPropertyType,
        },
        recentSales:
          recentSales?.map((sale) => ({
            id: sale.id,
            address: sale.address,
            price: sale.price,
            propertyType: sale.property_type,
            saleDate: sale.sale_date,
            bedrooms: sale.bedrooms,
            bathrooms: sale.bathrooms,
          })) || [],
        priceHistory:
          priceHistory?.map((item) => ({
            price: item.price,
            date: item.sale_date,
          })) || [],
      },
    });
  } catch (error) {
    console.error("Postcode lookup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to lookup postcode",
      },
      { status: 500 }
    );
  }
}
