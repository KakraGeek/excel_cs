/**
 * Map Embed Component
 * 
 * Client component that displays a Google Map with a labeled marker
 * showing the Excel Community School location.
 * 
 * Features:
 * - Interactive Google Map
 * - Custom marker with "Excel Community School" label
 * - Responsive design
 * - Fallback to static iframe if API key is not available
 * 
 * Requirements:
 * - Google Maps JavaScript API key in NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable
 * - If no API key is provided, falls back to static embed
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface MapEmbedProps {
  /**
   * Latitude coordinate for the marker
   */
  latitude: number;
  /**
   * Longitude coordinate for the marker
   */
  longitude: number;
  /**
   * Label text to display on the marker
   */
  label: string;
  /**
   * Height of the map container (default: 400px)
   */
  height?: string;
}

// Declare Google Maps types for TypeScript
// Using unknown for Google Maps API types as they're loaded dynamically
interface GoogleMaps {
  maps: {
    Map: new (element: HTMLElement, options: unknown) => unknown;
    MapTypeId: { ROADMAP: string };
    Marker: new (options: unknown) => {
      addListener: (event: string, callback: () => void) => void;
    };
    InfoWindow: new (options: unknown) => {
      open: (map: unknown, marker: unknown) => void;
    };
    Animation: { DROP: string };
  };
}

declare global {
  interface Window {
    google?: GoogleMaps;
    initMap?: () => void;
  }
}

export function MapEmbed({ latitude, longitude, label, height = '400px' }: MapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const mapInstanceRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);

  // Declare initializeMap function with useCallback to memoize it
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      return;
    }

    // Prevent re-initialization
    if (mapInstanceRef.current) {
      return;
    }

    try {
      // Create map
      const map = new window.google!.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 17,
        mapTypeId: window.google!.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      } as unknown);

      mapInstanceRef.current = map;

      // Create marker with label
      // The label property adds text directly on the marker
      const marker = new window.google!.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: label,
        label: {
          text: label,
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        animation: window.google!.maps.Animation.DROP,
      } as unknown);

      markerRef.current = marker;

      // Create info window (shows label on click for better UX)
      const infoWindow = new window.google!.maps.InfoWindow({
        content: `<div style="padding: 8px; font-weight: bold; color: #1e40af;">${label}</div>`,
      } as unknown);

      // Show info window on marker click
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(true);
    }
  }, [latitude, longitude, label]);

  useEffect(() => {
    // Check if API key is available
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      // No API key - will use fallback iframe
      setMapError(true);
      return;
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError(true);
    };

    // Set up global callback
    window.initMap = () => {
      setMapLoaded(true);
      initializeMap();
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google) {
      initializeMap();
    }
  }, [mapLoaded, latitude, longitude, label, initializeMap]);

  // Fallback to static iframe if API key is not available or map fails to load
  if (mapError || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-lg border border-border">
        <iframe
          src={`https://www.google.com/maps?q=${latitude},${longitude}+(${encodeURIComponent(label)})&output=embed`}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${label} location on Google Maps`}
          className="w-full"
          aria-label={`${label} location on Google Maps`}
        />
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full rounded-lg overflow-hidden shadow-lg border border-border"
      style={{ height }}
      aria-label={`${label} location on Google Maps`}
    />
  );
}
