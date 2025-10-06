"use client";

import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface ItemContentProps {
  id: number;
  title: string;
  description: string; // Markdown or HTML
  icon?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  background?: { url: string };
}

export default function ItemContent({
  title,
  description,
  icon,
  buttonText,
  buttonURL,
  background,
}: ItemContentProps) {
  return (
    <div
      className="relative p-6 rounded-2xl text-gray-800 w-full flex flex-col justify-between bg-stone-100"
      style={{
        backgroundImage: background?.url ? `url(${background.url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 min-h-[400px] flex flex-col justify-start">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-6 text-center pt-2">{title}</h3>

        {/* Icon */}
        {icon?.url && (
          <div className="mb-4">
            <Image
              src={icon.url}
              alt={title}
              width={70}
              height={70}
              className="mx-auto invert my-6"
            />
          </div>
        )}

        {/* Description (Markdown + HTML Support) */}
        {description && (
          <div className="prose prose-sm md:prose-base text-justify mx-auto mb-4">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (<h1 className="text-4xl mt-8 mb-4" {...props} />),
                h2: ({ node, ...props }) => (<h2 className="text-3xl mt-6 mb-3" {...props} />),
                h3: ({ node, ...props }) => <h2 className="text-2xl mt-6 mb-3" {...props} />,
                h4: ({ node, ...props }) => <h2 className="text-xl mt-6 mb-3" {...props} />,
                h5: ({ node, ...props }) => <h2 className="text-lg mt-6 mb-3" {...props} />,
                h6: ({ node, ...props }) => <h2 className="text-md mt-6 mb-3" {...props} />,
                p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li className="leading-snug" {...props} />,
                code: ({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: {
                  node?: any;
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) =>
                  inline ? (
                    <code className="bg-gray-200 rounded px-1 text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-900 text-white p-4 rounded-xl overflow-x-auto text-sm">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ),
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Button */}
      {buttonText && buttonURL && (
        <div className="relative z-10 text-center mt-4">
          <a
            href={buttonURL}
            className="inline-block bg-[#2b2d42] text-neutral-100 px-8 py-3 rounded-xl font-bold hover:text-white hover:bg-rose-600 transition-colors duration-300 shadow-xl/40"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );
}
