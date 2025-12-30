'use client';

import { useState } from 'react';
import SeriesModal from './SeriesModal';

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Thumbnail: string;
}

interface Episode {
  ID: number;
  SeriesID: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Title: string;
  Episode: string;
}

interface Props {
  series: TVSeries;
  episodes?: Episode[];
  loading: boolean;
  onLoadEpisodes: (seriesID: number) => void;
}

export default function SeriesCard(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => {
          setOpen(true);
          props.onLoadEpisodes(props.series.ID);
        }}
        className="cursor-pointer bg-neutral-900 rounded-lg overflow-hidden hover:scale-105 transition"
      >
        <img
          src={`data:image/png;base64,${props.series.Thumbnail}`}
          alt={props.series.Title}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h2 className="text-sm font-bold">{props.series.Title}</h2>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <SeriesModal
          {...props}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
