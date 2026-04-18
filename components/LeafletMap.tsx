"use client";

import dynamic from 'next/dynamic';
import { Hospital } from '@/lib/overpass';

export interface LeafletMapProps {
  userLocation: { lat: number; lon: number } | null;
  hospitals: Hospital[];
  selectedHospitalId: string | null;
  onHospitalSelect: (id: string) => void;
  recenterTrigger?: number;
  activeRoute?: [number, number][];
  onNavigate?: (id: string) => void;
  isAmbulanceMode?: boolean;
}

const LeafletMap = dynamic(
  () => import('./MapLayer'),
  { ssr: false }
);

export default LeafletMap;
