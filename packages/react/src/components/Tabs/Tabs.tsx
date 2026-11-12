import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import clsx from "clsx";
import { Tabs as TabsRadix } from "radix-ui";
import * as React from "react";

import styles from "./Tabs.module.scss";
import { TabsProps } from "./Tabs.types";

// Resistência e limite do efeito elástico (bounce) ao arrastar/deslizar além do início/fim da lista
const OVERSCROLL_RESISTANCE = 0.5;
const OVERSCROLL_MAX = 56;
const EDGE_BOUNCE = 14;
// Se o passo normal deixaria a aba da borda coberta em 30% ou menos, assiste indo direto ao fim/início
const ASSIST_VISIBLE_THRESHOLD = 0.3;

const applyResistance = (distance: number) => Math.min(distance * OVERSCROLL_RESISTANCE, OVERSCROLL_MAX);

const Tabs: React.FC<TabsProps> = ({
	items,
	defaultValue,
	value,
	onValueChange,
	keyboardActivationMode = "automatic",
	loop = true,
	scrollAmount = 150,
	className,
	disabled,
	id,
	"aria-label": ariaLabel,
	"data-testid": testId,
}) => {
	const listRef = React.useRef<HTMLDivElement>(null);
	const innerListRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(false);
	const [isSnapScrolling, setIsSnapScrolling] = React.useState(false);
	const snapTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// Drag-to-scroll (mouse)
	const isDragging = React.useRef(false);
	const dragStartX = React.useRef(0);
	const scrollStartLeft = React.useRef(0);
	const hasDragged = React.useRef(false);

	// Swipe (touch)
	const touchStartX = React.useRef(0);
	const touchStartScrollLeft = React.useRef(0);

	const edgeHitRef = React.useRef<"left" | "right" | null>(null);

	const edgeLockRef = React.useRef({ left: false, right: false });

	const checkScroll = React.useCallback(() => {
		const el = listRef.current;
		if (!el) return;
		const epsilon = 5;
		const canLeft = el.scrollLeft > epsilon;
		const canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - epsilon;

		const unlockMargin = epsilon * 4;
		if (el.scrollLeft > unlockMargin) edgeLockRef.current.left = false;
		if (el.scrollLeft + el.clientWidth < el.scrollWidth - unlockMargin) edgeLockRef.current.right = false;

		setCanScrollLeft(canLeft && !edgeLockRef.current.left);
		setCanScrollRight(canRight && !edgeLockRef.current.right);
	}, []);

	const setOvershoot = React.useCallback((px: number) => {
		const el = innerListRef.current;
		if (!el) return;
		el.style.transform = px ? `translateX(${px}px)` : "";
	}, []);

	const springBack = React.useCallback(() => {
		innerListRef.current?.classList.add(styles.Bounce);
		setOvershoot(0);
	}, [setOvershoot]);

	const microBounce = React.useCallback((edge: "left" | "right") => {
		const el = innerListRef.current;
		if (!el) return;
		el.classList.remove(styles.Bounce);
		el.style.transform = `translateX(${edge === "left" ? EDGE_BOUNCE : -EDGE_BOUNCE}px)`;
		void el.offsetWidth;
		el.classList.add(styles.Bounce);
		el.style.transform = "";
	}, []);

	const handleBounceTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
		e.currentTarget.classList.remove(styles.Bounce);
	};

	React.useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		checkScroll();
		el.addEventListener("scroll", checkScroll);
		const ro = new ResizeObserver(checkScroll);
		ro.observe(el);

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging.current || !listRef.current) return;
			const delta = e.clientX - dragStartX.current;
			if (Math.abs(delta) > 5) hasDragged.current = true;

			const current = listRef.current;
			const max = current.scrollWidth - current.clientWidth;
			if (max <= 0) return; // sem overflow: não há o que rolar, bounce não se aplica

			const target = scrollStartLeft.current - delta;

			if (target < 0) {
				current.scrollLeft = 0;
				setOvershoot(applyResistance(-target));
			} else if (target > max) {
				current.scrollLeft = max;
				setOvershoot(-applyResistance(target - max));
			} else {
				current.scrollLeft = target;
				setOvershoot(0);
			}
		};

		const handleMouseUp = () => {
			if (!isDragging.current || !listRef.current) return;
			isDragging.current = false;
			listRef.current.style.cursor = "";
			springBack();
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		const handleTouchStart = (e: TouchEvent) => {
			if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
			setIsSnapScrolling(false);
			innerListRef.current?.classList.remove(styles.Bounce);
			touchStartX.current = e.touches[0].clientX;
			touchStartScrollLeft.current = el.scrollLeft;
		};

		const handleTouchMove = (e: TouchEvent) => {
			const delta = e.touches[0].clientX - touchStartX.current;
			const max = el.scrollWidth - el.clientWidth;
			if (max <= 0) return; // sem overflow: não há o que rolar, bounce não se aplica

			const target = touchStartScrollLeft.current - delta;

			if (target < 0) {
				e.preventDefault();
				el.scrollLeft = 0;
				setOvershoot(applyResistance(-target));
			} else if (target > max) {
				e.preventDefault();
				el.scrollLeft = max;
				setOvershoot(-applyResistance(target - max));
			} else {
				setOvershoot(0);
			}
		};

		const handleTouchEnd = () => springBack();

		el.addEventListener("touchstart", handleTouchStart, { passive: true });
		el.addEventListener("touchmove", handleTouchMove, { passive: false });
		el.addEventListener("touchend", handleTouchEnd);
		el.addEventListener("touchcancel", handleTouchEnd);

		const handleScrollEnd = () => {
			setIsSnapScrolling(false);
			const edge = edgeHitRef.current;
			edgeHitRef.current = null;
			if (edge) {
				microBounce(edge);
				edgeLockRef.current[edge] = true;
				if (edge === "left") setCanScrollLeft(false);
				else setCanScrollRight(false);
			}
		};
		el.addEventListener("scrollend", handleScrollEnd);

		return () => {
			el.removeEventListener("scroll", checkScroll);
			el.removeEventListener("scrollend", handleScrollEnd);
			el.removeEventListener("touchstart", handleTouchStart);
			el.removeEventListener("touchmove", handleTouchMove);
			el.removeEventListener("touchend", handleTouchEnd);
			el.removeEventListener("touchcancel", handleTouchEnd);
			ro.disconnect();
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
			if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
		};
	}, [checkScroll, setOvershoot, springBack, microBounce]);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = listRef.current;
		if (!el) return;
		if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
		setIsSnapScrolling(false);
		innerListRef.current?.classList.remove(styles.Bounce);
		isDragging.current = true;
		hasDragged.current = false;
		dragStartX.current = e.clientX;
		scrollStartLeft.current = el.scrollLeft;
		el.style.cursor = "grabbing";
	};

	const handleClickCapture = (e: React.MouseEvent) => {
		if (hasDragged.current) {
			e.stopPropagation();
			hasDragged.current = false;
		}
	};

	const applyEdgeAssist = (el: HTMLDivElement, direction: "left" | "right", target: number, max: number) => {
		if (target <= 0 || target >= max || !innerListRef.current) return target;

		const elRect = el.getBoundingClientRect();
		const triggers = Array.from(innerListRef.current.children) as HTMLElement[];
		const rects = triggers.map((trigger) => {
			const r = trigger.getBoundingClientRect();
			const start = r.left - elRect.left + el.scrollLeft;
			return { start, end: start + r.width, width: r.width };
		});

		if (direction === "right") {
			const last = rects[rects.length - 1];
			const windowEnd = target + el.clientWidth;
			if (last && last.start < windowEnd && last.end > windowEnd) {
				const hiddenFraction = (last.end - windowEnd) / last.width;
				if (hiddenFraction <= ASSIST_VISIBLE_THRESHOLD) return max;
			}
		} else {
			const first = rects[0];
			if (first && first.start < target && first.end > target) {
				const hiddenFraction = (target - first.start) / first.width;
				if (hiddenFraction <= ASSIST_VISIBLE_THRESHOLD) return 0;
			}
		}

		return target;
	};

	const handleScroll = (direction: "left" | "right") => {
		const el = listRef.current;
		if (!el) return;

		const max = el.scrollWidth - el.clientWidth;
		const rawTarget =
			direction === "left"
				? Math.max(0, el.scrollLeft - scrollAmount)
				: Math.min(max, el.scrollLeft + scrollAmount);
		const target = applyEdgeAssist(el, direction, rawTarget, max);
		const reachedEdge = target === 0 || target === max;

		edgeHitRef.current = reachedEdge ? direction : null;

		if (!reachedEdge) {
			setIsSnapScrolling(true);
			if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
			snapTimeoutRef.current = setTimeout(() => setIsSnapScrolling(false), 600);
		}

		el.scrollTo({ left: target, behavior: "smooth" });
	};

	return (
		<TabsRadix.Root
			id={id}
			defaultValue={defaultValue}
			value={value}
			onValueChange={onValueChange}
			orientation="horizontal"
			activationMode={keyboardActivationMode}
			className={clsx(styles.Root, className)}
			data-testid={testId}
		>
			<div className={styles.ListWrapper}>
				<button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					className={clsx(styles.ScrollButton, {
						[styles.ScrollButtonHidden]: !canScrollLeft,
					})}
					onClick={() => handleScroll("left")}
				>
					<ChevronLeftRegular />
				</button>

				<div
					ref={listRef}
					role="none"
					className={clsx(styles.ListScroll, { [styles.ListScrollSnap]: isSnapScrolling })}
					onMouseDown={handleMouseDown}
					onClickCapture={handleClickCapture}
				>
					<TabsRadix.List
						ref={innerListRef}
						loop={loop}
						aria-label={ariaLabel}
						className={styles.List}
						onTransitionEnd={handleBounceTransitionEnd}
					>
						{items.map((item) => (
							<TabsRadix.Trigger
								key={item.value}
								value={item.value}
								disabled={disabled || item.disabled}
								className={styles.Trigger}
							>
								{item.icon}
								{item.label}
							</TabsRadix.Trigger>
						))}
					</TabsRadix.List>
				</div>

				<button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					className={clsx(styles.ScrollButton, {
						[styles.ScrollButtonHidden]: !canScrollRight,
					})}
					onClick={() => handleScroll("right")}
				>
					<ChevronRightRegular />
				</button>
			</div>

			{items.map((item) => (
				<TabsRadix.Content key={item.value} value={item.value} className={styles.Content}>
					{item.content}
				</TabsRadix.Content>
			))}
		</TabsRadix.Root>
	);
};

export default Tabs;

