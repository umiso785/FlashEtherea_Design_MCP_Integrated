import React from 'react';

export default function IDELayout() {
  return (
    <div className="h-screen bg-blue-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">FlashEtherea IDE</h1>
        <p className="text-gray-400 mb-8">AI/SEO 자동화 전장 시스템</p>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-green-400">✅ 시스템 정상 작동</p>
          <p className="text-blue-400">📡 MCP 서버 준비 완료</p>
          <p className="text-yellow-400">⚡ FlashEtherea v1.0.0</p>
        </div>
      </div>
    </div>
  );
}