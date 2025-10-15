"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Eye, EyeOff, Code, FileText } from "lucide-react";

const MarkdownEditor = ({
  value,
  onChange,
  placeholder = "Write your note here...",
}) => {
  const [showPreview, setShowPreview] = useState(true);
  const [viewMode, setViewMode] = useState("split"); // 'split', 'edit', 'preview'

  const renderViewMode = () => {
    switch (viewMode) {
      case "edit":
        return (
          <div className="w-full h-full">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-sm resize-none"
              placeholder={placeholder}
            />
          </div>
        );
      case "preview":
        return (
          <div className="w-full h-full overflow-y-auto px-4 py-3 border border-gray-300 rounded-lg bg-white">
            <div className="prose prose-pink max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {value || "*Nothing to preview*"}
              </ReactMarkdown>
            </div>
          </div>
        );
      case "split":
      default:
        return (
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="h-full">
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-sm resize-none"
                placeholder={placeholder}
              />
            </div>
            <div className="h-full overflow-y-auto px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="prose prose-pink max-w-none prose-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {value || "*Nothing to preview*"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 bg-gray-100 p-2 rounded-lg">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              viewMode === "split"
                ? "bg-pink-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Code size={16} />
            Split
          </button>
          <button
            onClick={() => setViewMode("edit")}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              viewMode === "edit"
                ? "bg-pink-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText size={16} />
            Edit
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              viewMode === "preview"
                ? "bg-pink-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
        <div className="text-xs text-gray-600">
          Markdown supported • {value?.length || 0} characters
        </div>
      </div>
      <div className="flex-1 min-h-0">{renderViewMode()}</div>
    </div>
  );
};

export default MarkdownEditor;
