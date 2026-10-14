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
      <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-6 lg:col-span-7 animate-pulse">
              <div className="h-6 w-36 rounded-full bg-muted" />
              <div className="h-12 w-3/4 rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded-md bg-muted" />
                <div className="h-4 w-5/6 rounded-md bg-muted" />
              </div>
              <div className="h-11 w-36 rounded-xl bg-muted" />
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-4/3 w-full rounded-2xl bg-muted animate-pulse border border-border/40" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-28">
      {/* Decorative ambient gradient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Content */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Digital Innovation</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.12]">
              {content.title}
            </h1>

            <p className="max-w-2xl text-base font-normal leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              {content.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                className="group h-12 cursor-pointer gap-2 rounded-xl px-6 text-base font-semibold shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/35"
              >
                <span>{content.buttonLabel || "Read More"}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-2xl transition-all duration-300 hover:border-border">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={content.banner?.alternativeText || content.title || "Banner image"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  No Banner Image
                </div>
              )}
              {/* Subtle overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;