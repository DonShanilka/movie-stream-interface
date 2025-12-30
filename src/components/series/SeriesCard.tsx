'use client';

interface TVSeries {
  ID: number;
  Title: string;
  Thumbnail: string;
  Banner: string;
}

export default function SeriesCard({
  series,
  onClick,
}: {
  series: TVSeries;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-neutral-900 rounded-lg overflow-hidden hover:scale-105 transition"
    >
      <img
        src={`data:image/png;base64,${series.Banner}`}
        alt={series.Title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h2 className="text-sm font-bold">{series.Title}</h2>
      </div>
    </div>
  );
}
