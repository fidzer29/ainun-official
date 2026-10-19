"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useReducedMotionPreference from "./reactbits/useReducedMotionPreference";

const reviews = [
  {
    name: "Siti",
    city: "Bandung",
    quote:
      "Bahannya nyaman banget dipakai, modelnya juga bagus. Dipakai olahraga tetap nyaman dan tidak gerah.",
  },
  {
    name: "Rina",
    city: "Jakarta",
    quote:
      "Potongannya terasa leluasa untuk bergerak dan tetap terlihat rapi. Suka banget dengan pilihan warnanya.",
  },
  {
    name: "Alya",
    city: "Surabaya",
    quote:
      "Desainnya simpel dan anggun. Enak dipakai untuk aktivitas sehari-hari maupun saat berolahraga.",
  },
  {
    name: "Nadia",
    city: "Yogyakarta",
    quote:
      "Bahannya terasa ringan dan modelnya nyaman dipakai seharian. Jadi makin percaya diri beraktivitas.",
  },
  {
    name: "Dewi",
    city: "Bandung",
    quote:
      "Detailnya bagus dan modelnya versatile. Bisa dipakai untuk olahraga, lalu lanjut aktivitas lainnya.",
  },
];

const reviewSlides = [
  { review: reviews[reviews.length - 1], originalIndex: reviews.length - 1 },
  ...reviews.map((review, originalIndex) => ({ review, originalIndex })),
  { review: reviews[0], originalIndex: 0 },
];

function getScrollPosition(track, card) {
  const trackBounds = track.getBoundingClientRect();
  const cardBounds = card.getBoundingClientRect();
  return (
    track.scrollLeft +
    cardBounds.left +
    cardBounds.width / 2 -
    (trackBounds.left + track.clientWidth / 2)
  );
}

export default function ReviewCarousel() {
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const jumpPendingRef = useRef(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const activeIndex =
    (activeSlideIndex - 1 + reviews.length) % reviews.length;
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateActiveReview() {
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
      const cards = Array.from(track.querySelectorAll(".review-card"));
      const currentSlideIndex = cards.reduce(
        (closestIndex, card, index) => {
          const cardCenter =
            card.getBoundingClientRect().left + card.offsetWidth / 2;
          const distance = Math.abs(trackCenter - cardCenter);
          return distance < closestIndex.distance
            ? { index, distance }
            : closestIndex;
        },
        { index: 0, distance: Infinity },
      ).index;

      if (
        currentSlideIndex === 0 ||
        currentSlideIndex === reviewSlides.length - 1
      ) {
        if (jumpPendingRef.current) return;

        const resetIndex =
          currentSlideIndex === 0 ? reviews.length : 1;
        const resetCard = cards[resetIndex];
        jumpPendingRef.current = true;
        setActiveSlideIndex(currentSlideIndex);
        requestAnimationFrame(() => {
          track.scrollLeft = getScrollPosition(track, resetCard);
          setActiveSlideIndex(resetIndex);
          jumpPendingRef.current = false;
        });
        return;
      }

      setActiveSlideIndex(currentSlideIndex);
    }

    const firstRealCard = track.querySelectorAll(".review-card")[1];
    track.scrollLeft = getScrollPosition(track, firstRealCard);
    updateActiveReview();
    track.addEventListener("scroll", updateActiveReview, { passive: true });
    window.addEventListener("resize", updateActiveReview);
    return () => {
      track.removeEventListener("scroll", updateActiveReview);
      window.removeEventListener("resize", updateActiveReview);
    };
  }, []);

  function goToReview(index) {
    const track = trackRef.current;
    const card = track?.querySelectorAll(".review-card")[index + 1];
    if (!track || !card) return;

    track.scrollTo({
      left: getScrollPosition(track, card),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function startDrag(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  }

  function drag(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    event.preventDefault();
    trackRef.current.scrollLeft =
      dragRef.current.startScrollLeft - (event.clientX - dragRef.current.startX);
  }

  function stopDrag(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return;

    const track = trackRef.current;
    dragRef.current = null;
    track?.classList.remove("is-dragging");
    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToReview((activeIndex + reviews.length - 1) % reviews.length);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToReview((activeIndex + 1) % reviews.length);
    }
  }

  return (
    <div className="review-carousel">
      <button
        className="review-arrow review-arrow--previous"
        type="button"
        aria-label="Ulasan sebelumnya"
        onClick={() =>
          goToReview((activeIndex + reviews.length - 1) % reviews.length)
        }
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <div
        className="review-track"
        ref={trackRef}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Ulasan pelanggan"
        tabIndex={0}
      >
        {reviewSlides.map(({ review, originalIndex }, index) => (
          <article
            className={`review-card${activeSlideIndex === index ? " is-active" : ""}`}
            key={`${review.name}-${index}`}
            aria-label={`Ulasan ${originalIndex + 1} dari ${reviews.length}`}
            aria-hidden={
              index === 0 || index === reviewSlides.length - 1
                ? "true"
                : undefined
            }
            aria-current={
              activeSlideIndex === index &&
              index !== 0 &&
              index !== reviewSlides.length - 1
                ? "true"
                : undefined
            }
          >
            <div className="review-stars" aria-label="Rating lima dari lima">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} aria-hidden="true" />
              ))}
            </div>
            <blockquote>“{review.quote}”</blockquote>
            <div className="review-author">
              <span className="review-avatar" aria-hidden="true">
                {review.name.charAt(0)}
              </span>
              <span className="review-author-details">
                <strong>{review.name}</strong>
                <span>{review.city}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
      <button
        className="review-arrow review-arrow--next"
        type="button"
        aria-label="Ulasan berikutnya"
        onClick={() => goToReview((activeIndex + 1) % reviews.length)}
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <div className="review-pagination" aria-label="Pilih halaman ulasan">
        {reviews.map((review, page) => (
          <button
            className={`review-page-dot${activeIndex === page ? " is-active" : ""}`}
            key={review.name}
            type="button"
            aria-label={`Tampilkan halaman ulasan ${page + 1}`}
            aria-current={activeIndex === page ? "true" : undefined}
            onClick={() => goToReview(page)}
          />
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        Ulasan {activeIndex + 1} dari {reviews.length}
      </p>
    </div>
  );
}
