interface DateCellProps {
  value: string | Date;
}

export default function DateCell({ value }: DateCellProps) {
  const formattedValue =
    value instanceof Date
      ? value.toDateString()
      : new Date(value).toDateString();
  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] truncate">{formattedValue}</span>
    </div>
  );
}
