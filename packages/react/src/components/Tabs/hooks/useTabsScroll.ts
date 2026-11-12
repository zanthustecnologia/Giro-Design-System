import * as React from "react";

import styles from "../Tabs.module.scss";

// Resistência e limite do efeito elástico (bounce) ao arrastar/deslizar além do início/fim da lista
const OVERSCROLL_RESISTANCE = 0.5;
const OVERSCROLL_MAX = 56;
const EDGE_BOUNCE = 14;
// Se o passo normal deixaria a aba da borda coberta em 30% ou menos, assiste indo direto ao fim/início
const ASSIST_VISIBLE_THRESHOLD = 0.3;
// Tolerância mínima para considerar que o scroll chegou na borda (evita ruído de subpixel); um valor
// muito maior aqui voltaria a esconder o botão antes do fim real do scroll, cortando a última aba
const EDGE_EPSILON = 5;
// Distância real de afastamento da borda para destravar a seta (ignora ruído de poucos px)
const EDGE_UNLOCK_MARGIN = EDGE_EPSILON * 4;
// Distância mínima de arrasto para considerar "drag" em vez de clique
const DRAG_THRESHOLD = 5;

const applyResistance = (distance: number) => Math.min(distance * OVERSCROLL_RESISTANCE, OVERSCROLL_MAX);

export interface UseTabsScrollProps {
	/** Quantidade de pixels percorridos por clique nas setas de scroll */
	scrollAmount: number;
}

export interface UseTabsScrollReturn {
	/** Ref do container com overflow-x (setas, drag e toque operam sobre ele) */
	listRef: React.RefObject<HTMLDivElement | null>;
	/** Ref da lista interna (recebe o transform do efeito elástico) */
	innerListRef: React.RefObject<HTMLDivElement | null>;
	canScrollLeft: boolean;
	canScrollRight: boolean;
	isSnapScrolling: boolean;
	handleScroll: (direction: "left" | "right") => void;
	handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
	handleClickCapture: (e: React.MouseEvent) => void;
	handleBounceTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
}

/**
 * Encapsula toda a lógica de rolagem horizontal do Tabs: setas de scroll (com assistência até a
 * borda), drag-to-scroll (mouse), swipe (touch) e o efeito elástico (bounce) ao ultrapassar os limites.
 */
export function useTabsScroll({ scrollAmount }: UseTabsScrollProps): UseTabsScrollReturn {
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
		const canLeft = el.scrollLeft > EDGE_EPSILON;
		const canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE_EPSILON;

		// Só libera a trava quando o scroll já se afastou claramente da borda (não por ruído de poucos px)
		if (el.scrollLeft > EDGE_UNLOCK_MARGIN) edgeLockRef.current.left = false;
		if (el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE_UNLOCK_MARGIN) edgeLockRef.current.right = false;

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
		void el.offsetWidth; // força o reflow/pintura do estado empurrado
		el.classList.add(styles.Bounce);
		el.style.transform = "";
	}, []);

	const handleBounceTransitionEnd = React.useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
		// transitionend borbulha dos Triggers (hover/cor); ignora para não cortar o bounce no meio
		if (e.target !== e.currentTarget) return;
		e.currentTarget.classList.remove(styles.Bounce);
	}, []);

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
			if (Math.abs(delta) > DRAG_THRESHOLD) hasDragged.current = true;

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

	const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
	}, []);

	const handleClickCapture = React.useCallback((e: React.MouseEvent) => {
		if (hasDragged.current) {
			e.stopPropagation();
			hasDragged.current = false;
		}
	}, []);

	// Se o passo normal deixaria a aba da borda quase toda visível (pouco coberta pelo limite do
	// container), assiste o usuário indo direto até o fim/início em vez de parar no meio dela.
	// Só se aplica quando a aba cortada é de fato a primeira/última da lista, nunca uma intermediária.
	const applyEdgeAssist = React.useCallback(
		(el: HTMLDivElement, direction: "left" | "right", target: number, max: number) => {
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
		},
		[],
	);

	const handleScroll = React.useCallback(
		(direction: "left" | "right") => {
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

			if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
			if (reachedEdge) {
				// Cancela qualquer snap pendente de um clique anterior: na borda, o scroll-snap não deve
				// interferir no alvo exato já calculado acima (mesmo em cliques duplos bem rápidos)
				setIsSnapScrolling(false);
			} else {
				setIsSnapScrolling(true);
				snapTimeoutRef.current = setTimeout(() => setIsSnapScrolling(false), 600);
			}

			el.scrollTo({ left: target, behavior: "smooth" });
		},
		[scrollAmount, applyEdgeAssist],
	);

	return {
		listRef,
		innerListRef,
		canScrollLeft,
		canScrollRight,
		isSnapScrolling,
		handleScroll,
		handleMouseDown,
		handleClickCapture,
		handleBounceTransitionEnd,
	};
}

export default useTabsScroll;
