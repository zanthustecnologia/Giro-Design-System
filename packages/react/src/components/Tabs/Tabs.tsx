import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import clsx from "clsx";
import { Tabs as TabsRadix } from "radix-ui";
import * as React from "react";

import styles from "./Tabs.module.scss";
import { TabsProps } from "./Tabs.types";

// Resistência e limite do efeito elástico (bounce) ao arrastar/deslizar além do início/fim da lista
const OVERSCROLL_RESISTANCE = 0.5;
const OVERSCROLL_MAX = 56;

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

	const checkScroll = React.useCallback(() => {
		const el = listRef.current;
		if (!el) return;
		const btnW = 24;
		setCanScrollLeft(el.scrollLeft > btnW);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - btnW);
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

		const handleScrollEnd = () => setIsSnapScrolling(false);
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
	}, [checkScroll, setOvershoot, springBack]);

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

	const handleScroll = (direction: "left" | "right") => {
		setIsSnapScrolling(true);
		if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
		snapTimeoutRef.current = setTimeout(() => setIsSnapScrolling(false), 600);
		listRef.current?.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
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

