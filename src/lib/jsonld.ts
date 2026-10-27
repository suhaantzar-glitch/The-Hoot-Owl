import { hours } from "@/content/hours";
import { isPlaceholder, site } from "@/content/site";

/** schema.org BarOrPub description of the bar, for search engines. */
export function barJsonLd() {
  const sameAs = Object.values(site.social).filter((url) => !isPlaceholder(url));

  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "@id": `${site.url}/#bar`,
    name: site.name,
    alternateName: "The Hoot",
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapLinkUrl,
    openingHoursSpecification: hours
      .filter((d) => d.open && d.close)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.day}`,
        opens: d.open,
        closes: d.close,
      })),
    paymentAccepted: "Cash",
    currenciesAccepted: "USD",
    priceRange: "$",
    foundingDate: site.foundingDate,
    founder: site.founders.map((name) => ({ "@type": "Person", name })),
    ...(isPlaceholder(site.phone) ? {} : { telephone: site.phone }),
    ...(isPlaceholder(site.email) ? {} : { email: site.email }),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
