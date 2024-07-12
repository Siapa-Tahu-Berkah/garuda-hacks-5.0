"use client";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const rawData = [
  { event: "Workshop", total: 186, mobile: 80 },
  { event: "Medical Check Up", total: 305, mobile: 200 },
  { event: "Free Food", total: 237, mobile: 120 },
];

const totalVotes = rawData.reduce((sum, item) => sum + item.total, 0);

const chartData = rawData.map(item => ({
  ...item,
  total: ((item.total / totalVotes) * 100).toFixed(2), // convert to percentage and keep 2 decimal places
}));

const chartConfig = {
  total: {
    color: "#284b63",
  },
  mobile: {
    label: "",
    color: "#284b63",
  },
  label: {
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

const Chart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Vote Result</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="event"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="total"
              layout="vertical"
              fill="var(--color-total)"
              radius={4}
            >
              <LabelList
                dataKey="event"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label] font-semibold text-base"
              />
              <LabelList
                dataKey="total"
                position="right"
                offset={8}
                className="fill-foreground font-semibold text-base"
                formatter={(value: any) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
