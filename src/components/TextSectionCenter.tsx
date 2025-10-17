"use client";

import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface TextSectionProps {
  title: string;
  content: string; // Markdown or HTML from Strapi
  background?: { url: string };
}

export default function TextSection({ title, content, background }: TextSectionProps) {
  const testVideo = "/Background.mp4";
  const testPoster = "/testBackground.jpg";
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <section className="min-h-[500px] relative py-24 text-gray-800 bg-linear-to-b from-white/50 to-stone-200/50 -z-5">
      {/* Background */}
      {background?.url ? (
        <Image
          src={background.url}
          alt={title || "Background image"}
          fill
          quality={100}
          priority
          className="object-cover brightness-50 -z-10"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={testPoster}
          className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10 opacity-5"
        >
          <source src={testVideo} type="video/mp4" />
        </video>
      )}

      {/* Content */}
      <div className="text-stone-800 relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">{title}</h2>

        {content && (
          <div className="prose prose-lg md:prose-xl mx-auto text-left">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (props) => (<h1 className="text-4xl mt-8 mb-4" {...props} />),
                h2: (props) => (<h2 className="text-3xl mt-6 mb-3" {...props} />),
                h3: (props) => <h2 className="text-2xl mt-6 mb-3" {...props} />,
                h4: (props) => <h2 className="text-xl mt-6 mb-3" {...props} />,
                h5: (props) => <h2 className="text-lg mt-6 mb-3" {...props} />,
                h6: (props) => <h2 className="text-md mt-6 mb-3" {...props} />,
                p: (props) => <p className="mb-4" {...props} />,
                a: (props) => (
                  <a
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ inline, className, children, ...props }: {
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) =>
                  inline ? (
                    <code className="bg-gray-200 rounded px-1" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-900 text-white p-4 rounded-xl overflow-x-auto">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  );
}
