import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Koleksi pakaian olahraga syar'i Ainun Official dalam warna hitam, army, dan terracotta";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const heroPhoto = await readFile(
  join(process.cwd(), "public/images/afiyah_set/afiyah.JPG"),
  "base64",
);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "stretch",
          gap: 42,
          padding: "48px",
          color: "#2e211c",
          background:
            "linear-gradient(102deg, #e7d2c4 0%, #f1e5d9 58%, #d7c4b0 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "54%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "auto",
              alignSelf: "flex-start",
              borderRadius: 999,
              padding: "10px 18px",
              color: "#fff",
              background: "#60463e",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            AINUN OFFICIAL
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
              fontFamily: "Georgia, serif",
              fontSize: 66,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.04,
            }}
          >
            <span>Syar&apos;i Sporty</span>
            <span>Aktivitas</span>
            <span>Tanpa Batas</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 520,
              marginTop: 22,
              color: "#4f4039",
              fontSize: 24,
              lineHeight: 1.35,
            }}
          >
            Pakaian olahraga syar&apos;i yang nyaman untuk menemani aktivitasmu.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 26,
              color: "#60463e",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#222", fontSize: 26 }}>●</span>
            <span>Hitam</span>
            <span style={{ color: "#66735d", fontSize: 26 }}>●</span>
            <span>Army</span>
            <span style={{ color: "#a65d4c", fontSize: 26 }}>●</span>
            <span>Terracotta</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            border: "8px solid rgba(255,255,255,.7)",
            borderRadius: "190px 190px 24px 24px",
            boxShadow: "0 24px 60px rgba(56,40,36,.18)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/jpeg;base64,${heroPhoto}`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
