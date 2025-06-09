"use client";

import React, { useState, ChangeEvent, DragEvent } from "react";
import { Upload, FileText, File, ChevronDown } from "lucide-react";

interface Agent {
  value: string;
  label: string;
}

const UploadDoc = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const agents: Agent[] = [
    { value: "contract-analyzer", label: "Contract Analyzer" },
    { value: "legal-reviewer", label: "Legal Reviewer" },
    { value: "compliance-checker", label: "Compliance Checker" },
    { value: "risk-assessor", label: "Risk Assessor" },
    { value: "clause-extractor", label: "Clause Extractor" },
  ];

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAgentChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedAgent(e.target.value);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();
    return extension === "pdf" ? (
      <FileText className="w-6 h-6" />
    ) : (
      <File className="w-6 h-6" />
    );
  };

  const removeFile = (): void => {
    setUploadedFile(null);
  };

  return (
    <div>
      {/* Agent Selection Dropdown */}
      <div className="flex justify-start mb-5">
        <div className="relative">
          <select
            value={selectedAgent}
            onChange={handleAgentChange}
            className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-48"
          >
            <option value="">Select Agent</option>
            {agents.map((agent: Agent) => (
              <option key={agent.value} value={agent.value}>
                {agent.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* File Upload Component */}
      <div className="w-full">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-gray-500 bg-gray-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.txt,.rtf"
            onChange={handleFileChange}
          />

          {uploadedFile ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                {getFileIcon(uploadedFile.name)}
                <div className="text-left">
                  <p className="font-medium text-green-800">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-green-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="px-6 py-2 border border-transparent rounded-lg cursor-pointer text-sm text-red-600 hover:text-red-800 underline z-99 hover:bg-red-50 hover:border hover:border-red-200"
                type="button"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop your document here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports PDF, DOC, DOCX, TXT, RTF files up to 10MB
                </p>
              </div>
              <button
                type="button"
                className="px-6 py-2 bg-green-500 text-white rounded-lg transition-colors"
              >
                Choose File
              </button>
            </div>
          )}
        </div>

        {/* Upload Status */}
        {uploadedFile && selectedAgent && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">Ready to Analyze</p>
                <p className="text-sm text-green-600">
                  File: {uploadedFile.name} | Agent:{" "}
                  {agents.find((a: Agent) => a.value === selectedAgent)?.label}
                </p>
              </div>
              <button
                className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors"
                type="button"
              >
                Start Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDoc;
