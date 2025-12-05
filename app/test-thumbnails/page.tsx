'use client';

import React, { useState, useEffect } from 'react';

// Todos tus videos para probar
const VIDEOS = [
  { id: '1143146527', title: 'Boda Mágica' },
  { id: '1143145449', title: 'Revelación de Sexo' },
  { id: '1143147056', title: 'Celebración de Boda' },
  { id: '1143149115', title: 'Quinceañera' },
  { id: '1143146143', title: 'Revelación de Sexo 2' },
  { id: '1143147531', title: 'Boda Espectacular' },
  { id: '1143150497', title: 'Evento Corporativo' },
  { id: '1143148210', title: 'Boda Inolvidable' },
  { id: '1143149062', title: 'Revelación de Género' },
  { id: '1143148875', title: 'Boda de Ensueño' },
  { id: '1143149150', title: 'Pirotecnia Espectacular' },
  { id: '1143151770', title: 'Boda Especial' },
];

interface TestResult {
  success: boolean;
  url: string;
  loadTime?: number;
  method: string;
  dimensions?: string;
  error?: string;
}

export default function ThumbnailTester() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [testing, setTesting] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  const testThumbnailUrl = async (
    vimeoId: string,
    method: string,
    url: string
  ): Promise<TestResult> => {
    return new Promise((resolve) => {
      // Verificar si estamos en el cliente
      if (typeof window === 'undefined') {
        resolve({
          success: false,
          url,
          method,
          error: 'Running on server',
        });
        return;
      }

      const img = document.createElement('img');
      const startTime = Date.now();

      img.onload = () => {
        const loadTime = Date.now() - startTime;
        resolve({
          success: true,
          url,
          loadTime,
          method,
          dimensions: `${img.width}x${img.height}`,
        });
      };

      img.onerror = () => {
        resolve({
          success: false,
          url,
          method,
          error: 'Failed to load',
        });
      };

      setTimeout(() => {
        if (!img.complete) {
          resolve({
            success: false,
            url,
            method,
            error: 'Timeout (5s)',
          });
        }
      }, 5000);

      img.src = url;
    });
  };

  const testVideo = async (vimeoId: string) => {
    const methods = [
      {
        name: 'Vumbnail',
        url: `https://vumbnail.com/${vimeoId}.jpg`,
      },
      {
        name: 'Vimeocdn 640x360',
        url: `https://i.vimeocdn.com/video/${vimeoId}_640x360.jpg`,
      },
      {
        name: 'Vimeocdn 960x540',
        url: `https://i.vimeocdn.com/video/${vimeoId}_960x540.jpg`,
      },
      {
        name: 'Vimeocdn base',
        url: `https://i.vimeocdn.com/video/${vimeoId}.jpg`,
      },
    ];

    const testResults: TestResult[] = [];

    for (const method of methods) {
      const result = await testThumbnailUrl(vimeoId, method.name, method.url);
      testResults.push(result);
    }

    // Probar oEmbed API
    try {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`
      );

      if (response.ok) {
        const data = await response.json();
        testResults.push({
          success: true,
          method: 'oEmbed API',
          url: data.thumbnail_url,
          dimensions: `${data.thumbnail_width}x${data.thumbnail_height}`,
        });
      } else {
        testResults.push({
          success: false,
          method: 'oEmbed API',
          url: '',
          error: `HTTP ${response.status}`,
        });
      }
    } catch (error: any) {
      testResults.push({
        success: false,
        method: 'oEmbed API',
        url: '',
        error: error.message || 'CORS or Network Error',
      });
    }

    return testResults;
  };

  const runTests = async () => {
    setTesting(true);
    setResults({});

    for (const video of VIDEOS) {
      setCurrentTest(`Probando ${video.title}...`);
      const videoResults = await testVideo(video.id);
      setResults((prev) => ({
        ...prev,
        [video.id]: {
          title: video.title,
          results: videoResults,
        },
      }));
    }

    setCurrentTest('');
    setTesting(false);
  };

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      runTests();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🔍 Test de Thumbnails de Vimeo
          </h1>
          <p className="text-gray-400 mb-4">
            Verificando qué métodos funcionan para cargar las miniaturas de los{' '}
            {VIDEOS.length} videos...
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={runTests}
              disabled={testing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {testing ? 'Probando...' : 'Volver a probar'}
            </button>

            {testing && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span>{currentTest}</span>
              </div>
            )}
          </div>

          {/* Resumen rápido */}
          {Object.keys(results).length > 0 && !testing && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="font-bold mb-2">📊 Resumen rápido:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {['Vumbnail', 'Vimeocdn 640x360', 'Vimeocdn 960x540', 'oEmbed API'].map(
                  (method) => {
                    const success = Object.values(results).filter((r: any) =>
                      r.results.some(
                        (res: TestResult) => res.method === method && res.success
                      )
                    ).length;
                    const total = Object.keys(results).length;
                    const percentage = ((success / total) * 100).toFixed(0);

                    return (
                      <div key={method} className="bg-gray-700 p-3 rounded">
                        <div className="font-semibold text-xs text-gray-400 mb-1">
                          {method}
                        </div>
                        <div className="text-2xl font-bold">
                          {success}/{total}
                        </div>
                        <div className="text-xs text-gray-400">{percentage}%</div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        {testing && Object.keys(results).length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Iniciando pruebas...</p>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(results).map(([vimeoId, data]: [string, any]) => (
            <div key={vimeoId} className="bg-gray-800 rounded-xl p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                {data.title}
                <span className="text-gray-500 text-sm md:text-base ml-3">
                  ID: {vimeoId}
                </span>
              </h2>

              <div className="grid gap-3">
                {data.results.map((result: TestResult, index: number) => (
                  <div
                    key={index}
                    className={`p-3 md:p-4 rounded-lg border-2 ${
                      result.success
                        ? 'bg-green-900/20 border-green-500'
                        : 'bg-red-900/20 border-red-500'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
                          {result.success ? (
                            <span className="text-green-400">✓</span>
                          ) : (
                            <span className="text-red-400">✗</span>
                          )}
                          {result.method}
                        </h3>
                        {result.success && (
                          <div className="text-xs md:text-sm text-gray-400 mt-1">
                            {result.loadTime && (
                              <span className="mr-4">⚡ {result.loadTime}ms</span>
                            )}
                            {result.dimensions && <span>📐 {result.dimensions}</span>}
                          </div>
                        )}
                        {!result.success && (
                          <p className="text-red-400 text-xs md:text-sm mt-1">
                            Error: {result.error}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 break-all font-mono mt-2">
                          {result.url}
                        </p>
                      </div>
                      {result.success && result.url && (
                        <img
                          src={result.url}
                          alt={result.method}
                          className="w-full md:w-40 h-auto object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 md:p-4 bg-gray-900/50 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-400 text-sm md:text-base">
                  📊 Recomendación:
                </h4>
                <p className="text-xs md:text-sm text-gray-300">
                  {data.results.some(
                    (r: TestResult) => r.success && r.method === 'Vumbnail'
                  )
                    ? '✅ Usar Vumbnail (método más rápido y confiable)'
                    : data.results.some(
                        (r: TestResult) => r.success && r.method === 'oEmbed API'
                      )
                    ? '⚠️ Usar oEmbed API (requiere petición adicional)'
                    : data.results.some((r: TestResult) => r.success)
                    ? '⚠️ Usar Vimeocdn (puede no tener todas las miniaturas)'
                    : '❌ Ningún método funciona - Verificar ID del video'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 md:p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
          <h3 className="text-lg md:text-xl font-bold mb-4">
            💡 Soluciones recomendadas:
          </h3>
          <ul className="space-y-2 text-sm md:text-base text-gray-300">
            <li>
              <strong className="text-white">Si Vumbnail funciona:</strong> Usar como
              método principal (más rápido)
            </li>
            <li>
              <strong className="text-white">Si oEmbed funciona:</strong> Usar como
              fallback (más lento pero confiable)
            </li>
            <li>
              <strong className="text-white">Si ninguno funciona:</strong> Verificar
              que el video sea público en Vimeo
            </li>
            <li>
              <strong className="text-white">CORS errors:</strong> Agregar proxy o usar
              Image de Next.js con dominios configurados
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}