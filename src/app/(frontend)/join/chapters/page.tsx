'use client'

import mapboxgl from 'mapbox-gl'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import geojson from './chapters.json'
import './mapbox.css'

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const zoom = isTabletOrMobile ? 2.25 : 4

  useEffect(() => {
    setPageIsMounted(true)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css'
    document.head.appendChild(link)

    mapboxgl.accessToken =
      process.env.MAPBOX_ACCESS_TOKEN ||
      'pk.eyJ1IjoiaXNzYWNsMTQiLCJhIjoiY2x5bDlteXEzMWFxazJpcG55N2E5eGt5ZiJ9.ni0ledudRQEsUtuvG_f3zA'

    const map = new mapboxgl.Map({
      accessToken: mapboxgl.accessToken,
      container: 'map-container',
      center: [-95.712891, 40.09024],
      zoom: zoom,
      style: 'mapbox://styles/mapbox/dark-v11',
      config: {
        basemap: {
          lightPreset: 'night',
        },
      },
    })

    geojson.features.map((feature) => {
      const [lng, lat] = feature.geometry.coordinates
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 40, className: 'custom-popup' })
            .setHTML(
              `<h3>${feature.properties.title}</h3>
          <p>${feature.properties.description}</p>
          ${
            feature.properties.instagram
              ? `
          <a href="https://instagram.com/${feature.properties.instagram}" target="_blank" rel="noreferrer" class="flex gap-1 items-center">
            <img src="/instagram.svg" alt="Instagram" class="w-5 h-5" />
            <div>@${feature.properties.instagram}</div>
          </a>`
              : ''
          }
          ${
            (feature.properties as any).email
              ? `
          <a href="mailto:${(feature.properties as any).email}" target="_blank" rel="noreferrer" class="flex gap-1 items-center pt-2">
            <img src="/mail.svg" alt="Email" class="w-5 h-5" />
            <div>${(feature.properties as any).email}</div>
          </a>`
              : ''
          }
          `,
            ),
        )
        .addTo(map)
    })

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    return () => {
      document.head.removeChild(link)
      map.remove()
    }
  }, [zoom])

  return (
    <div className="flex w-full flex-col bg-yoi-white dark:bg-yoi-black">
      <main className="z-1 flex flex-col">
        <section className="h-screen w-full pb-12 md:pb-24 lg:pb-32">
          <div id="map-container" className="h-screen w-full" />
        </section>
        <div className="z-2 bg-radial-ellipse-tl absolute from-yoi-header-from from-25% to-transparent pl-6 pr-6 pt-20  sm:pt-28">
          <h1 className="fancy text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none">
            Find A Chapter
          </h1>
          <p className="max-w-[600px] pt-4 text-gray-800 dark:text-gray-400 md:text-xl">
            Use our interactive map to find a YOI chapter near you. If you don&apos;t see one near
            you, consider starting one!
          </p>
        </div>
      </main>
    </div>
  )
}
