import { ImageResponse } from "next/og";

export const alt = "Koleksi fashion wanita Ainun Official";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 76px",
          color: "#30231e",
          background:
            "linear-gradient(112deg, #f8f2eb 0%, #ead9ca 58%, #d3b8a4 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "56%",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: 24,
              letterSpacing: 8,
              color: "#72574b",
            }}
          >
            AINUN OFFICIAL
          </span>
          <span
            style={{
              marginTop: 36,
              fontSize: 65,
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            Koleksi fashion
            <br />
            wanita pilihan
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 25,
              color: "#66554c",
            }}
          >
            Nyaman, anggun, dan siap menemani harimu.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: 360,
            height: 420,
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 14,
            padding: "35px 18px 0",
            borderRadius: "180px 180px 18px 18px",
            background:
              "linear-gradient(160deg, rgba(255,255,255,.72), rgba(158,119,94,.2))",
          }}
        >
          {["#282625", "#344052", "#874d43"].map((color, index) => (
            <div
              key={color}
              style={{
                display: "flex",
                width: 90,
                height: index === 1 ? 355 : 330,
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "46px 46px 10px 10px",
                background: color,
              }}
            >
              <div
                style={{
                  width: 55,
                  height: 88,
                  marginTop: -14,
                  borderRadius: "48% 48% 42% 42%",
                  background: color,
                  boxShadow: "inset 0 -24px 0 rgba(183,126,96,.9)",
                }}
              />
              <div
                style={{
                  width: 66,
                  height: 220,
                  marginTop: 6,
                  borderRadius: "18px 18px 7px 7px",
                  background: color,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
