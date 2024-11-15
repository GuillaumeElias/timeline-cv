import React from "react";
import { Arc, Circle, Group } from "react-konva";

interface TinyPieChartProps {
  x: number;
  y: number;
  percentage: number;
  radius: number;
  backgroundColor: string;
}

const TinyPieChart: React.FC<TinyPieChartProps> = ({ x, y, percentage, radius, backgroundColor }) => {
  const filledAngle = (percentage / 100) * 360; 
  const startAngle = -90;
  const endAngle = startAngle + filledAngle;

  return (
    <Group x={x} y={y}>
      <Circle x={radius} y={radius} radius={radius} fill={backgroundColor} />
      <Circle x={radius} y={radius} radius={radius} fill="rgba(0, 0, 0, 0.2)" />
      <Arc
        x={radius}
        y={radius}
        innerRadius={0} 
        outerRadius={radius}
        angle={filledAngle}
        rotation={startAngle}
        fill="black"
      />
    </Group>
  );
};

export default TinyPieChart;
