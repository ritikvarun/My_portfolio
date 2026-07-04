"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { getNotes } from "@/lib/api";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getNotes()
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main className="overflow-hidden bg-[rgb(230,230,230)] min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-black"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Notes & Code Snippets
            </motion.h1>
            <motion.p
              className="title text-base sm:text-lg mt-4 text-gray-600 tracking-wider max-w-xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              A collection of developer guides, configurations, code solutions, and quick snippets I write and reference.
            </motion.p>
          </div>

          {/* List of Notes */}
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">
              Loading notes & snippets...
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              No notes or code snippets published yet. Check back later!
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {notes.map((note, index) => (
                <motion.div
                  key={note._id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.5 }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-4 border-b border-gray-100 pb-4 mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                      {note.title}
                    </h2>
                    <span className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                      {note.language}
                    </span>
                  </div>

                  {note.description && (
                    <p className="title text-gray-700 text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-wrap mb-4">
                      {note.description}
                    </p>
                  )}

                  {note.code && (
                    <div className="relative mt-4">
                      <div className="absolute right-4 top-3 text-[10px] text-zinc-500 uppercase tracking-widest font-mono select-none">
                        {note.language}
                      </div>
                      <pre className="bg-zinc-950 p-5 rounded-2xl font-mono text-[13px] overflow-x-auto border border-zinc-800 text-zinc-200 whitespace-pre leading-relaxed shadow-inner">
                        <code>{note.code}</code>
                      </pre>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NotesPage;
