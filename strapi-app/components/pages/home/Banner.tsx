"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  getHomePageData,
  getStrapiMediaUrl,
  type BannerData,
} from "@/axios/homeapi";

interface BannerProps {
  data?: BannerData;
}

const FALLBACK_DATA: BannerData = {
  title: "Building Scalable Digital Experiences",
  description:
    "We design and engineer fast, scalable web applications and seamless digital products tailored for growing global brands.",
  buttonLabel: "Read More",
  banner: {
    url: "/uploads/thought_catalog_505eect_W54k_unsplash_9ef5c8acd3.jpg",
    alternativeText: "Scalable Digital Experiences",
  },
};

const Banner = ({ data }: BannerProps) => {
  const [fetchedData, setFetchedData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    // If data was passed as a prop, no need to fetch
    if (data) {
      return;
    }

    let isMounted = true;

    getHomePageData()
      .then((resData) => {
        if (isMounted && resData) {
          setFetchedData(resData);
        }
      })
      .catch((err) => {
        console.warn("Strapi fetch error, using fallback data:", err);
        if (isMounted) setFetchedData(FALLBACK_DATA);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [data]);

  const content = data || fetchedData || FALLBACK_DATA;
  const imageUrl = getStrapiMediaUrl(content.banner?.url);

  if (loading) {
    return (
      <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-muted">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="flex max-w-3xl w-full flex-col items-center space-y-5 animate-pulse">
            <div className="h-6 w-36 rounded-full bg-muted-foreground/20" />
            <div className="h-12 w-3/4 rounded-lg bg-muted-foreground/20" />
            <div className="space-y-2 w-full max-w-xl flex flex-col items-center">
              <div className="h-4 w-full rounded-md bg-muted-foreground/20" />
              <div className="h-4 w-5/6 rounded-md bg-muted-foreground/20" />
            </div>
            <div className="h-11 w-36 rounded-lg bg-muted-foreground/20" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden">
      {/* 100% Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={
            content.banner?.alternativeText ||
            content.title ||
            "Banner background"
          }
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Professional Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Content (Horizontally and Vertically) */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="flex max-w-3xl flex-col items-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white">
            <Sparkles className="size-3.5" />
            <span>Digital Innovation</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
            {content.title}
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-base sm:text-lg font-normal text-white/90 leading-relaxed">
            {content.description}
          </p>

          {/* Clean & Simple Button */}
          <div className="pt-2">
            <Button
              className="bg-white text-black hover:bg-white/90 h-11 px-6 rounded-lg gap-2 text-sm font-medium cursor-pointer"
            >
              <span>{content.buttonLabel || "Read More"}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;